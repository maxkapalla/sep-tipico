package com.example.septipico.liga;

import javax.persistence.*;

@Entity
@Table(name = "Team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;


    @Column(name = "name", nullable = false, unique = false)
    private String name;

    @Column(name = "points", nullable = false)
    private int points;

    @Column(name = "goals", nullable = false)
    private int goals;


    @Column(name = "winnings")
    private int winnings;

    @Column(name = "draws")
    private int draws;

    @Column(name = "losses")
    private int losses;

    @Column(name = "liga")
    private Long liga;


    public Team() {

    }

    public Team(String name) {
        this.name = name;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String teamName) {
        this.name = teamName;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public Long getLiga() {
        return liga;
    }

    public void setLiga(Long liga) {
        this.liga = liga;
    }

    public int getWinnings() {
        return winnings;
    }

    public void setWinnings(int winnings) {
        this.winnings = winnings;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }
}
