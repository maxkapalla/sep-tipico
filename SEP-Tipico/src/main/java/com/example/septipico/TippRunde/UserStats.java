package com.example.septipico.TippRunde;

public class UserStats {

    String teamName;
    long teamID;
    int pointsForUser;

    int pointsForTable;
    int tordif;
    int wins;
    int draws;
    int loses;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public long getTeamID() {
        return teamID;
    }

    public void setTeamID(long teamID) {
        this.teamID = teamID;
    }

    public int getPointsForUser() {
        return pointsForUser;
    }

    public void setPointsForUser(int pointsForUser) {
        this.pointsForUser = pointsForUser;
    }

    public int getPointsForTable() {
        return pointsForTable;
    }

    public void setPointsForTable(int pointsForTable) {
        this.pointsForTable = pointsForTable;
    }

    public int getTordif() {
        return tordif;
    }

    public void setTordif(int tordif) {
        this.tordif = tordif;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public int getLoses() {
        return loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }
}
