package com.example.septipico.nutzer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NutzerRepository extends JpaRepository<Nutzer, Long> {

    Nutzer findNutzerByEmailAndPassword(String email,String password);

    
}
