package com.ecommerce.project2.repository;

import com.ecommerce.project2.model.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long>{
    List<ContactInfo> findAllByUserId(Long userId);
}
