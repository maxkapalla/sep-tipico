package com.example.septipico.TippRunde;

import javax.persistence.*;

@Entity
public class TippRunde {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name= "tipprundename")
    private String tipprundeName;

    @Column(name= "password")
    private String password;

    @Column(name= "Zugang")
    private String zugang;

    @Column(name= "Besitzer")
    private Long besitzer;

    @Column(name= "Liga")
    private Long liga;

    public TippRunde() {
    }
    public TippRunde(String tipprundeName, String password, String zugang, Long besitzer, Long liga) {
        this.tipprundeName= tipprundeName;
        this.password= password;
        this.zugang= zugang;
        this.besitzer= besitzer;
        this.liga= liga;
    }
}
