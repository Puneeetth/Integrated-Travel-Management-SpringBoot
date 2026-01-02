package com.tour.Integrated.Travel.Management.Controller;

import com.razorpay.RazorpayException;
import com.tour.Integrated.Travel.Management.Service.PaymentService;
import com.tour.Integrated.Travel.Management.dto.Request.CreateOrderRequest;
import com.tour.Integrated.Travel.Management.dto.Request.VerifyPaymentRequest;
import com.tour.Integrated.Travel.Management.dto.Response.PaymentResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Check if user has pending payment
    @GetMapping("/pending/{userId}")
    public ResponseEntity<Map<String, Object>> checkPendingPayment(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        boolean hasPending = paymentService.hasPendingPayment(userId);
        response.put("hasPendingPayment", hasPending);

        if (hasPending) {
            Optional<PaymentResponse> pending = paymentService.getPendingPayment(userId);
            pending.ifPresent(p -> response.put("pendingPayment", p));
        }

        return ResponseEntity.ok(response);
    }

    // Create Razorpay order
    @PostMapping("/create-order/{userId}")
    public ResponseEntity<?> createOrder(
            @PathVariable Long userId,
            @Valid @RequestBody CreateOrderRequest request) {
        try {
            PaymentResponse response = paymentService.createOrder(userId, request);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create Razorpay order: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Verify payment after Razorpay checkout
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody VerifyPaymentRequest request) {
        try {
            PaymentResponse response = paymentService.verifyPayment(request);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Payment verification failed: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Cancel pending payment
    @PutMapping("/{paymentId}/cancel/{userId}")
    public ResponseEntity<?> cancelPayment(
            @PathVariable Long paymentId,
            @PathVariable Long userId) {
        try {
            paymentService.cancelPayment(paymentId, userId);
            return ResponseEntity.ok(Map.of("message", "Payment cancelled successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all payments for user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsForUser(@PathVariable Long userId) {
        List<PaymentResponse> payments = paymentService.getPaymentsForUser(userId);
        return ResponseEntity.ok(payments);
    }
}
