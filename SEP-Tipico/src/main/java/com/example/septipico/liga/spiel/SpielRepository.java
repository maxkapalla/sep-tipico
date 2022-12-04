package com.example.septipico.liga.spiel;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


import org.springframework.stereotype.Repository;

@Repository
public interface SpielRepository extends JpaRepository<Spiel, Long> {


     List<Spiel> findByTeamA(Long teamA);

     List<Spiel> findByTeamB(Long teamB);

     List<Spiel> findByLiga(Long liga);
}