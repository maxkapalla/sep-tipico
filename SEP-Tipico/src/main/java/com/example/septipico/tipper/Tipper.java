package com.example.septipico.tipper;

import javax.persistence.*;

@Entity
public class Tipper {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;


    @Column(name="nickname")
    private String nickname;

    @Column(name="nutzerid")
    private Long nutzerid;

    @Column(name = "TipprundenID")
    private Long tipprundenID;

    @Column(name = "Points")
    private Long Points;

    public Long getNutzerid() {
        return nutzerid;
    }

    public void setNutzerid(Long nutzerid) {
        this.nutzerid = nutzerid;
    }

    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname=nickname;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTipprundenID() {
        return tipprundenID;
    }

    public void setTipprundenID(Long tipprundenID) {
        this.tipprundenID = tipprundenID;
    }

    public Long getPoints() {
        return Points;
    }

    public void setPoints(Long points) {
        Points = points;
    }


}
