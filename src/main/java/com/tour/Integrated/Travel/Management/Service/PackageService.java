package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Repository.TourPackageRepository;
import com.tour.Integrated.Travel.Management.Transformers.PackageTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.PackageRequest;
import com.tour.Integrated.Travel.Management.dto.Response.PackageResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {
    private final TourPackageRepository tourPackageRepository;

    public PackageService(TourPackageRepository tourPackageRepository){
        this.tourPackageRepository = tourPackageRepository;
    }
    public PackageResponse createPackage(PackageRequest req){
        TourPackage entity = PackageTransformer.packageRequestToTourPackage(req);
        TourPackage saved = tourPackageRepository.save(entity);
        return PackageTransformer.tourPackageToPackageResponse(saved);
    }
    public List<PackageResponse> getAllPackages(){
        return tourPackageRepository
                .findAll()
                .stream()
                .map(PackageTransformer::tourPackageToPackageResponse)
                .toList();
    }
    public PackageResponse getPackageById(Long id){
        TourPackage t = tourPackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package Not Found"));
        return PackageTransformer.tourPackageToPackageResponse(t);
    }

    public PackageResponse updatePackageById(Long id,PackageRequest req){
        TourPackage existing = tourPackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package Not Found"));

        existing.setTitle(req.getTitle());
        existing.setDescription(req.getDescription());
        existing.setAvailableSeats(req.getAvailableSeats());
        existing.setPrice(req.getPrice());
        existing.setStartDate(req.getStartDate());
        existing.setEndDate(req.getEndDate());

        TourPackage saved = tourPackageRepository.save(existing);
        return PackageTransformer.tourPackageToPackageResponse(saved);

    }
    public void deletePackage(Long id){
        if(tourPackageRepository.existsById(id)) throw new RuntimeException("No Package Found");
        tourPackageRepository.deleteById(id);
    }
}
