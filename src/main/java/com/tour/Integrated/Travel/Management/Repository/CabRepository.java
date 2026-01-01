package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import com.tour.Integrated.Travel.Management.Model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CabRepository extends JpaRepository<Cab, Long> {

    List<Cab> findByAvailableTrue();

    List<Cab> findByVehicleType(VehicleType vehicleType);

    List<Cab> findByVehicleTypeAndAvailableTrue(VehicleType vehicleType);

    List<Cab> findBySeatingCapacityGreaterThanEqual(Integer capacity);
}
