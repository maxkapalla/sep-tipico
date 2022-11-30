package com.example.septipico.liga.spiel;

import com.example.septipico.liga.Team;

import javax.persistence.*;
import java.util.Date;
import java.util.Random;

@Entity
@Table(name = "Match")
public class Spiel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "teamA")
    private Long teamA;
    @Column(name = "teamB")
    private Long teamB;
    @Column(name = "date")
    private Date date;
    @Column(name = "spieltag")
    private int spieltag;
    @Column(name = "scoreTeamA")
    private int scoreTeamA;
    @Column(name = "scoreTeamB")
    private int scoreTeamB;

    @Column(name = "liga")
    private Long liga;


    public Spiel() {

    }

    public Spiel getSpiel(Long id) {
        return this;
    }

    public void setSpiel(Spiel spiel) {

        return;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setSpieltag(int spieltag) {
        this.spieltag = spieltag;
    }

    public void setScoreTeamA(int scoreTeamA) {
        this.scoreTeamA = scoreTeamA;
    }

    public void setScoreTeamB(int scoreTeamB) {
        this.scoreTeamB = scoreTeamB;
    }

    public Date getDate() {
        return date;
    }

    public int getSpieltag() {
        return spieltag;
    }

    public int getScoreTeamA() {
        return scoreTeamA;
    }

    public int getScoreTeamB() {
        return scoreTeamB;
    }

    public Long getLiga() {
        return liga;
    }

    public void setLiga(Long liga) {
        this.liga = liga;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTeamA() {
        return teamA;
    }

    public void setTeamA(Long teamA) {
        this.teamA = teamA;
    }

    public Long getTeamB() {
        return teamB;
    }

    public void setTeamB(Long teamB) {
        this.teamB = teamB;
    }


}
