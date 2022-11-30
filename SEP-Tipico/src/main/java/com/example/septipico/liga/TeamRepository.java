package com.example.septipico.liga;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {


    public List<Team> findByName(String name);

    public List<Team> findByLiga(Long liga);
    

}