package com.example.septipico.tipp;

import com.example.septipico.liga.Liga;
import com.example.septipico.liga.Team;
import com.example.septipico.nutzer.Nutzer;

public class Tipp {
    Nutzer tipper;
    Team team1;
    int team1Goals;

    Team team2;
    int team2Goals;

    Liga tippLiga;

    public Nutzer getTipper() {
        return tipper;
    }

    public void setTipper(Nutzer tipper) {
        this.tipper = tipper;
    }

    public Team getTeam1() {
        return team1;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public int getTeam1Goals() {
        return team1Goals;
    }

    public void setTeam1Goals(int team1Goals) {
        this.team1Goals = team1Goals;
    }

    public Team getTeam2() {
        return team2;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public int getTeam2Goals() {
        return team2Goals;
    }

    public void setTeam2Goals(int team2Goals) {
        this.team2Goals = team2Goals;
    }

    public Liga getTippLiga() {
        return tippLiga;
    }

    public void setTippLiga(Liga tippLiga) {
        this.tippLiga = tippLiga;
    }
}
