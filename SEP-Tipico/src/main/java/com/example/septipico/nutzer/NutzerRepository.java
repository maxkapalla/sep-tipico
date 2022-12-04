package com.example.septipico.nutzer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutzerRepository extends JpaRepository<Nutzer, Long> {

    Nutzer findNutzerByEmailAndPassword(String email,String password);

    
}
