package com.example.septipico.tipp;

import com.example.septipico.liga.Liga;
import com.example.septipico.liga.Team;
import com.example.septipico.liga.spiel.Spiel;
import com.example.septipico.nutzer.Nutzer;
import com.example.septipico.tippN.TippN;

public class TippContainer {

    TippN tipp;
    String team1;
    String team2;
    String tipp1;
    String tipp2;


    public String getTeam1() {
        return team1;
    }

    public void setTeam1(String team1) {
        this.team1 = team1;
    }


    public String getTeam2() {
        return team2;
    }

    public void setTeam2(String team2) {
        this.team2 = team2;
    }

    public TippN getTipp() {
        return tipp;
    }

    public void setTipp(TippN tipp) {
        this.tipp = tipp;
    }

    public String getTipp1() {
        return tipp1;
    }

    public void setTipp1(String tipp1) {
        this.tipp1 = tipp1;
    }

    public String getTipp2() {
        return tipp2;
    }

    public void setTipp2(String tipp2) {
        this.tipp2 = tipp2;
    }
}
