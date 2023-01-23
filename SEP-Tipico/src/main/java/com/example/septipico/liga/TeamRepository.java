package com.example.septipico.liga;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {


     List<Team> findByName(String name);

     List<Team> findAllByOrderByPointsDesc();

     List<Team> findByLiga(Long liga);

     Team findTeamById(Long id);

     void deleteAllByLiga(Long liga);

}