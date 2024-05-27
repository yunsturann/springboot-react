package com.ecommerce.project2.controller;

import com.ecommerce.project2.model.ContactInfo;
import com.ecommerce.project2.service.ContactInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/private/contactinfo")
public class ContactInfoController {

    private final ContactInfoService contactInfoService;

    public ContactInfoController(ContactInfoService contactInfoService) {
        this.contactInfoService = contactInfoService;
    }

    @PostMapping
    public ResponseEntity<ContactInfo> addContactInfo(@RequestBody ContactInfo contactInfo){
        try {
            ContactInfo result = contactInfoService.addContactInfo(contactInfo);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ContactInfo>> getAllContactInfosByUserId(@PathVariable Long userId) {
        List<ContactInfo> contactInfos = contactInfoService.getAllContactInfosByUserId(userId);
        return new ResponseEntity<>(contactInfos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateContactInfoById(@PathVariable Long id, @RequestBody ContactInfo contactInfo){
        String result = contactInfoService.updateContactInfoById(id, contactInfo);
        if(result.equals("Contact Info not found")){
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContactInfoById(@PathVariable Long id){
        String result = contactInfoService.deleteContactInfoById(id);
        if(result.equals("Contact Info not found")){
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}