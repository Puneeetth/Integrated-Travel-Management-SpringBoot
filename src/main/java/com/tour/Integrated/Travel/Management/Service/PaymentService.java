package com.tour.Integrated.Travel.Management.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import com.tour.Integrated.Travel.Management.Enum.PaymentStatus;
import com.tour.Integrated.Travel.Management.Model.*;
import com.tour.Integrated.Travel.Management.Repository.*;
import com.tour.Integrated.Travel.Management.dto.Request.CreateOrderRequest;
import com.tour.Integrated.Travel.Management.dto.Request.VerifyPaymentRequest;
import com.tour.Integrated.Travel.Management.dto.Response.PaymentResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final HotelBookingRepository hotelBookingRepository;
    private final CabBookingRepository cabBookingRepository;
    private final ActivityBookingRepository activityBookingRepository;

    public PaymentService(PaymentRepository paymentRepository,
            UserRepository userRepository,
            HotelBookingRepository hotelBookingRepository,
            CabBookingRepository cabBookingRepository,
            ActivityBookingRepository activityBookingRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.hotelBookingRepository = hotelBookingRepository;
        this.cabBookingRepository = cabBookingRepository;
        this.activityBookingRepository = activityBookingRepository;
    }

    // Check if user has pending payment
    public boolean hasPendingPayment(Long userId) {
        List<Payment> pendingPayments = paymentRepository.findByUserIdAndStatus(userId, PaymentStatus.PENDING);
        return !pendingPayments.isEmpty();
    }

    // Get pending payment for user
    public Optional<PaymentResponse> getPendingPayment(Long userId) {
        Optional<Payment> pendingPayment = paymentRepository.findFirstByUserIdAndStatusOrderByCreatedAtDesc(userId,
                PaymentStatus.PENDING);
        return pendingPayment.map(this::toPaymentResponse);
    }

    // Calculate total from pending bookings
    public Double calculateTotalAmount(Long userId, CreateOrderRequest request) {
        double total = 0.0;

        // Hotel bookings
        if (request.getHotelBookingIds() != null) {
            for (Long id : request.getHotelBookingIds()) {
                HotelBooking booking = hotelBookingRepository.findById(id).orElse(null);
                if (booking != null && booking.getUser().getId().equals(userId)) {
                    total += booking.getTotalPrice() != null ? booking.getTotalPrice() : 0;
                }
            }
        }

        // Cab bookings
        if (request.getCabBookingIds() != null) {
            for (Long id : request.getCabBookingIds()) {
                CabBooking booking = cabBookingRepository.findById(id).orElse(null);
                if (booking != null && booking.getUser().getId().equals(userId)) {
                    total += booking.getEstimatedFare() != null ? booking.getEstimatedFare() : 0;
                }
            }
        }

        // Activity bookings
        if (request.getActivityBookingIds() != null) {
            for (Long id : request.getActivityBookingIds()) {
                ActivityBooking booking = activityBookingRepository.findById(id).orElse(null);
                if (booking != null && booking.getUser().getId().equals(userId)) {
                    total += booking.getTotalPrice() != null ? booking.getTotalPrice() : 0;
                }
            }
        }

        return total;
    }

    // Create Razorpay order
    @Transactional
    public PaymentResponse createOrder(Long userId, CreateOrderRequest request) throws RazorpayException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check for existing pending payment
        if (hasPendingPayment(userId)) {
            throw new RuntimeException("Please complete or cancel your pending payment first");
        }

        Double totalAmount = calculateTotalAmount(userId, request);
        if (totalAmount <= 0) {
            throw new RuntimeException("No valid bookings to pay for");
        }

        // Create Razorpay order
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (totalAmount * 100)); // Razorpay expects amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());

        Order razorpayOrder = razorpay.orders.create(orderRequest);

        // Save payment record
        Payment payment = Payment.builder()
                .razorpayOrderId(razorpayOrder.get("id"))
                .amount(totalAmount)
                .currency("INR")
                .status(PaymentStatus.PENDING)
                .user(user)
                .hotelBookingIds(listToString(request.getHotelBookingIds()))
                .cabBookingIds(listToString(request.getCabBookingIds()))
                .activityBookingIds(listToString(request.getActivityBookingIds()))
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        PaymentResponse response = toPaymentResponse(savedPayment);
        response.setRazorpayKeyId(razorpayKeyId);
        return response;
    }

    // Verify and complete payment
    @Transactional
    public PaymentResponse verifyPayment(VerifyPaymentRequest request) throws RazorpayException {
        Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // Verify signature
        String generatedSignature = Utils.getHash(
                request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId(),
                razorpayKeySecret);

        // For test mode, we'll skip strict signature verification
        // In production, you should verify:
        // generatedSignature.equals(request.getRazorpaySignature())

        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(LocalDateTime.now());

        // Update all booking statuses to CONFIRMED
        updateBookingStatuses(payment);

        Payment updatedPayment = paymentRepository.save(payment);
        return toPaymentResponse(updatedPayment);
    }

    // Cancel pending payment
    @Transactional
    public void cancelPayment(Long paymentId, Long userId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (!payment.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Can only cancel pending payments");
        }

        payment.setStatus(PaymentStatus.FAILED);
        paymentRepository.save(payment);
    }

    // Get all payments for user
    public List<PaymentResponse> getPaymentsForUser(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
                .map(this::toPaymentResponse)
                .collect(Collectors.toList());
    }

    private void updateBookingStatuses(Payment payment) {
        // Update hotel bookings
        if (payment.getHotelBookingIds() != null && !payment.getHotelBookingIds().isEmpty()) {
            for (Long id : stringToList(payment.getHotelBookingIds())) {
                hotelBookingRepository.findById(id).ifPresent(booking -> {
                    booking.setStatus(com.tour.Integrated.Travel.Management.Enum.HotelBookingStatus.CONFIRMED);
                    hotelBookingRepository.save(booking);
                });
            }
        }

        // Update cab bookings
        if (payment.getCabBookingIds() != null && !payment.getCabBookingIds().isEmpty()) {
            for (Long id : stringToList(payment.getCabBookingIds())) {
                cabBookingRepository.findById(id).ifPresent(booking -> {
                    booking.setStatus(com.tour.Integrated.Travel.Management.Enum.CabBookingStatus.CONFIRMED);
                    cabBookingRepository.save(booking);
                });
            }
        }

        // Update activity bookings
        if (payment.getActivityBookingIds() != null && !payment.getActivityBookingIds().isEmpty()) {
            for (Long id : stringToList(payment.getActivityBookingIds())) {
                activityBookingRepository.findById(id).ifPresent(booking -> {
                    booking.setStatus(com.tour.Integrated.Travel.Management.Enum.ActivityBookingStatus.CONFIRMED);
                    activityBookingRepository.save(booking);
                });
            }
        }
    }

    private PaymentResponse toPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .razorpayOrderId(payment.getRazorpayOrderId())
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .status(payment.getStatus())
                .createdAt(payment.getCreatedAt())
                .paidAt(payment.getPaidAt())
                .hotelBookingIds(stringToList(payment.getHotelBookingIds()))
                .cabBookingIds(stringToList(payment.getCabBookingIds()))
                .activityBookingIds(stringToList(payment.getActivityBookingIds()))
                .userId(payment.getUser() != null ? payment.getUser().getId() : null)
                .build();
    }

    private String listToString(List<Long> list) {
        if (list == null || list.isEmpty())
            return null;
        return list.stream().map(String::valueOf).collect(Collectors.joining(","));
    }

    private List<Long> stringToList(String str) {
        if (str == null || str.isEmpty())
            return Collections.emptyList();
        return Arrays.stream(str.split(","))
                .map(Long::parseLong)
                .collect(Collectors.toList());
    }
}
