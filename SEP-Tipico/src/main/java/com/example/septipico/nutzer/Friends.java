package com.example.septipico.nutzer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Friends {
    @Id
    private Long id;
    @Column(name="Sender")
    private Long sender;
    @Column(name="Reciever")
    private Long reciever;
    @Column(name="Accepted")
    private boolean accepted;

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

    public Long getReciever() {
        return reciever;
    }
    public void setReciever(Long reciever) {
        this.reciever = reciever;
    }

    public boolean isAccepted() {
        return accepted;
    }
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
