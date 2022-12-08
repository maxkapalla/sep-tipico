package com.example.septipico.tipper;

import javax.persistence.*;

@Entity
public class Tipper {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "NutzerID")
    private Long nutzerID;

    @Column(name = "TipprundenID")
    private Long tipprundenID;

    @Column(name = "Points")
    private Long Points;

    public Long getNutzerID() {
        return nutzerID;
    }

    public void setNutzerID(Long nutzerID) {
        this.nutzerID = nutzerID;
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
