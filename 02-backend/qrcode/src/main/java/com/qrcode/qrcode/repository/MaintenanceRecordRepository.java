package com.qrcode.qrcode.repository;

import com.qrcode.qrcode.model.MaintenanceRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface MaintenanceRecordRepository extends MongoRepository<MaintenanceRecord, String> {
    Page<MaintenanceRecord> findByMaintenanceEquipmentIdContaining(String maintenanceEquipmentId, Pageable pageable);
}
