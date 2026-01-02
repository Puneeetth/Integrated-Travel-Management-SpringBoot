package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.PaymentStatus;
import com.tour.Integrated.Travel.Management.Model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserId(Long userId);

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    List<Payment> findByUserIdAndStatus(Long userId, PaymentStatus status);

    Optional<Payment> findFirstByUserIdAndStatusOrderByCreatedAtDesc(Long userId, PaymentStatus status);
}
