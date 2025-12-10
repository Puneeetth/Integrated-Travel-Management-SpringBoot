package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.PackageService;
import com.tour.Integrated.Travel.Management.dto.Request.PackageRequest;
import com.tour.Integrated.Travel.Management.dto.Response.PackageResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @PostMapping
    public PackageResponse create(@Valid @RequestBody PackageRequest req) {
        return packageService.createPackage(req);
    }

    @GetMapping
    public List<PackageResponse> getAll() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public PackageResponse getById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }

    @PutMapping("/{id}")
    public PackageResponse update(@PathVariable Long id,
                                  @Valid @RequestBody PackageRequest req) {
        return packageService.updatePackageById(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        packageService.deletePackage(id);
    }
}