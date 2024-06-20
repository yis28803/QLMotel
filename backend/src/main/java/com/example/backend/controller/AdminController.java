package com.example.backend.controller;

import com.example.backend.auth.RegisterRequest;
import com.example.backend.entity.UserAccount;
import com.example.backend.request.CreateNewStaffRequest;
import com.example.backend.service.AdminService;
import com.example.backend.service.ServiceOfService;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService service;
    private final ServiceOfService serviceOfService;

    @GetMapping
    public String get() {
        return "GET:: admin controller";
    }

    @PostMapping("/create-staff")
    public UserAccount createNewStaff(
            @RequestBody RegisterRequest request
    ) {
        return service.createNewStaff(request);
    }

    @PutMapping("/update-staff/{id}")
    public UserAccount updateStaff(
            @PathVariable("id") Long id,
            @RequestBody CreateNewStaffRequest request
    ) {
        return service.updateStaff(id, request);
    }

    @GetMapping("/get-all-staff")
    public ResponseEntity<List<UserAccount>> getAllStaff() {
        try {
            List<UserAccount> lt = service.getAllStaff();
            //
            if (lt != null) {
                return new ResponseEntity<>(lt, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            // Log lỗi
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all-service")
    public ResponseEntity<List<com.example.backend.entity.Service>> getAllService() {
        try {
            List<com.example.backend.entity.Service> lt = serviceOfService.getAllService();
            if (lt != null) {
                return new ResponseEntity<>(lt, HttpStatus.OK);
            } else {
                // Log lỗi hoặc xử lý khi list trả về là null
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            // Log lỗi
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete-staff/{id}")
    public void deleteStaff(
            @PathVariable("id") Long id
    ) {
        service.deleteStaff(id);
    }

    @Autowired
    private ServletContext servletContext;

    @PostMapping("/upload/{newEmployeeId}")
    public ResponseEntity<byte[]> handleFileUpload(@PathVariable("newEmployeeId") Long newEmployeeId, @RequestParam("avatar") MultipartFile file) {
        try {
            String fileName = newEmployeeId + "_" + file.getOriginalFilename();
            String dirPath = servletContext.getRealPath("/") + "uploads/";

            // Tạo đường dẫn nếu nó không tồn tại
            File dest = new File(dirPath);
            if (!dest.exists()) {
                dest.mkdirs();
            }

            // Lưu file
            dest = new File(dirPath + File.separator + fileName);
            file.transferTo(dest);

            Path sourcePath = dest.toPath();
            Path destinationPath = Paths.get("src/main/resources/static/uploads/avt/", fileName);
            Files.copy(sourcePath, destinationPath, StandardCopyOption.REPLACE_EXISTING);

            UserAccount userAccount = service.findUserAccountById(newEmployeeId);
            userAccount.setUserImageId(fileName);
            service.saveUser(userAccount);

            byte[] imageBytes = Files.readAllBytes(destinationPath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG );  // Thay đổi kiểu content type tùy theo loại ảnh của bạn

            // Trả về dữ liệu ảnh và các headers cần thiết
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
