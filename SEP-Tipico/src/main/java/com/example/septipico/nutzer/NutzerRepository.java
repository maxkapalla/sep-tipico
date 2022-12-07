package com.example.septipico.nutzer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NutzerRepository extends JpaRepository<Nutzer, Long> {

    Nutzer findNutzerByEmailAndPassword(String email,String password);

    List<Nutzer> findAllByFirstNameOrLastNameContaining(String firstName, String lastName);

    List<Nutzer> findAllByFirstNameContaining(String name);
    List<Nutzer> findAllByLastNameContaining(String name);
    Nutzer findNutzerById(Long id);
}
