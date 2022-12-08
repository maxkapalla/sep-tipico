package com.example.septipico.tipper;

import com.example.septipico.nutzer.Nutzer;

import javax.persistence.*;

@Entity
public class Tipper {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="nutzer")
    private Nutzer nutzer;

    @Column(name = "TipprundenID")
    private Long tipprundenID;

    @Column(name = "Points")
    private Long Points;

    public Nutzer getNutzer() {
        return nutzer;
    }

    public void setNutzer(Nutzer nutzer) {
        this.nutzer = nutzer;
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
