package com.example.septipico.nutzer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NutzerRepository extends JpaRepository<Nutzer, Long> {

    Nutzer findNutzerByEmailAndPassword(String email, String password);

    List<Nutzer> findAllByFirstNameOrLastNameContaining(String firstName, String lastName);

    List<Nutzer> findAllByFirstNameContaining(String name);

    List<Nutzer> findAllByLastNameContaining(String name);

    Nutzer findNutzerById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Nutzer SET kontostand = ?2 WHERE id = ?1")
    void updateKontostandById(Long id, Integer kontostand);

    @Modifying
    @Transactional
    @Query("UPDATE Nutzer SET geldWette = ?2 WHERE id = ?1")
    void updateGeldStatusById(Long id, String geldWette );

    List<Nutzer> findAllByGeldWette(String status);

    @Modifying
    @Transactional
    @Query("UPDATE Nutzer SET message = ?2 WHERE id = ?1")
    void updateMessageById(Long id, String message );

}
