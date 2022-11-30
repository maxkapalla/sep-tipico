package com.example.septipico.liga;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class LigaTabelle {
    private Long id;
    private Liga liga;
    private List<Team> teams = new ArrayList<>();

    public void addTeam(Team team) {
        this.teams.add(team);
    }

    public void addTeam(List<Team> teams) {
        this.teams.addAll(teams);
    }

    public void removeTeam(Team team) {
        this.teams.remove(team);
    }

    public List<Team> getTabelle() {
        return teams;
    }

    public List<Team> getRankingByPoints() {
        List<Team> ranking;
        ranking = this.teams.stream().sorted(Comparator.comparingInt(Team::getPoints)).collect(Collectors.toList());

        return ranking;
    }

    public List<Team> getRankingByGoals() {
        List<Team> ranking;
        ranking = this.teams.stream().sorted(Comparator.comparingInt(Team::getGoals)).collect(Collectors.toList());

        return ranking;
    }

}
