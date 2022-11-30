package com.example.septipico.liga.spiel;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

import com.example.septipico.liga.Team;

public interface SpielRepository extends JpaRepository<Spiel, Long> {


    public List<Spiel> findByTeamA(Long teamA);

    public List<Spiel> findByTeamB(Long teamB);

    public List<Spiel> findByLiga(Long liga);
}