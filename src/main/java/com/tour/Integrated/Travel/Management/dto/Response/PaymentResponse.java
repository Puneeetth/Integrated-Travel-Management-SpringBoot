package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private Double amount;
    private String currency;
    private PaymentStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private List<Long> hotelBookingIds;
    private List<Long> cabBookingIds;
    private List<Long> activityBookingIds;
    private Long userId;

    // Razorpay Key for frontend
    private String razorpayKeyId;
}
