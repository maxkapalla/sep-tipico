package com.example.septipico.TippRunde;

import javax.persistence.*;

@Entity
public class TippRunde {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
}
