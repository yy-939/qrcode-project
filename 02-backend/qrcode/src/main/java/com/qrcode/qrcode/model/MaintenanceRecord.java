package com.qrcode.qrcode.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Data
@Document(collection = "MaintenanceRecord")
public class MaintenanceRecord {
    @Id
    private String id;
    private Date time;
    private String worker;
    private Date startDate;
    private Date endDate;
    private String maintenanceContent;
    private boolean result;
    private Map<String, Integer> replacementParts; // <sub-part Id, # of replaced sub-parts>
    private String maintenanceEquipmentId;
}
