package com.example.septipico.nutzer;

import javax.persistence.*;

@Entity
public class Friends {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @Id
    private Long id;
    @Column(name="Nutzer1")
    private Long sender;
    @Column(name="Nutzer2")
    private Long receiver;
    @Column(name="Accepted")
    private boolean accepted;


    public Friends(Long sender, Long receiver, boolean accepted){
        this.sender= sender;
        this.receiver= receiver;
        this.accepted = accepted;
    }

    public Friends() {
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    public Long getSender() {
        return sender;
    }
    public void setSender(Long sender) {
        this.sender = sender;
    }

    public Long getReceiver() {
        return receiver;
    }
    public void setReceiver(Long reciever) {
        this.receiver = reciever;
    }

    public boolean isAccepted() {
        return accepted;
    }
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
