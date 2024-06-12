package com.qrcode.qrcode.repository;

import com.qrcode.qrcode.model.MachinePart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "machineParts", path = "machine-parts")
public interface MachinePartsRepository extends MongoRepository<MachinePart, String> {

    @Query("{ 'partId': { $regex: ?0, $options: 'i' } }") // ignore cases
    Page<MachinePart> findByPartId(String partId, Pageable pageable);
    @Query("{ 'englishName': { $regex: ?0, $options: 'i' } }")
    Page<MachinePart> findByEnglishNameContaining(String englishName, Pageable pageable);
    @Query("{ 'chineseName': { $regex: ?0, $options: 'i' } }")
    Page<MachinePart> findByChineseNameContaining(String chineseName, Pageable pageable);
}
