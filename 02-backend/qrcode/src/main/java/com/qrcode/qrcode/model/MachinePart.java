package com.qrcode.qrcode.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "MachineParts")
public class MachinePart {
    @Id
    private String id; // This will be mapped to MongoDB's _id field
    private String partId; // Custom part ID
    private String belongingEquipmentId; // For instance, [dryer] includes a [roller]
    private String englishName;
    private String chineseName;
    private String img;
}
