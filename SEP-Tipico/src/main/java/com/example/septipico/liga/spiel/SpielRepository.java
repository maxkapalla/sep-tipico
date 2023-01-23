package com.example.septipico.liga.spiel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SpielRepository extends JpaRepository<Spiel, Long> {


     List<Spiel> findByTeamA(Long teamA);

     List<Spiel> findByTeamB(Long teamB);

     List<Spiel> findByLiga(Long liga);

     List<Spiel> findAllByLigaOrderByDate(Long liga);

     void deleteAllByLiga(Long liga);
}