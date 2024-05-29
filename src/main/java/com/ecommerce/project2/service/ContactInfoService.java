package com.ecommerce.project2.service;

import com.ecommerce.project2.model.ContactInfo;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.repository.ContactInfoRepository;
import com.ecommerce.project2.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactInfoService {

    private final ContactInfoRepository contactInfoRepository;
    private final UserRepository userRepository;

    public ContactInfoService(ContactInfoRepository contactInfoRepository, UserRepository userRepository) {
        this.contactInfoRepository = contactInfoRepository;
        this.userRepository = userRepository;
    }

    public ContactInfo addContactInfo(ContactInfo contactInfo){
        User user = userRepository.findById(contactInfo.getUserId()).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found user id: " + contactInfo.getUserId());
        }
        contactInfo.setUserId(user.getId());
        return contactInfoRepository.save(contactInfo);
    }

    public List<ContactInfo> getAllContactInfosByUserId(Long userId){
        return contactInfoRepository.findAllByUserId(userId);
    }


    public String updateContactInfoById(Long id, ContactInfo contactInfo){
        ContactInfo contactInfo1 = contactInfoRepository.findById(id).orElse(null);
        if(contactInfo1 == null){
            return "Contact Info not found";
        }
        contactInfo1.setAddress(contactInfo.getAddress());
        contactInfo1.setTitle(contactInfo.getTitle());
        contactInfoRepository.save(contactInfo1);
        return "Contact Info updated successfully";
    }

    public String deleteContactInfoById(Long id){
        ContactInfo contactInfo = contactInfoRepository.findById(id).orElse(null);
        if(contactInfo == null){
            return "Contact Info not found";
        }
        contactInfoRepository.delete(contactInfo);
        return "Contact Info deleted successfully";
    }

    public String deleteAllContactInfoByUserId(Long userId){
        List<ContactInfo> contactInfos = contactInfoRepository.findAllByUserId(userId);
        if(contactInfos.isEmpty()){
            return "Contact Info not found";
        }
        contactInfoRepository.deleteAll(contactInfos);
        return "Contact Info deleted successfully";
    }

}
