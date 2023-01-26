package com.example.septipico.chat;

import javax.persistence.*;
import java.util.List;

@Entity
public class Chats {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @ElementCollection
    private List<Long> participants;

    private boolean requested;

    public Chats(){}
    public Chats(List<Long> participants, boolean requested){
        this.participants = participants;
        this.requested = requested;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public List<Long> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Long> participants) {
        this.participants = participants;
    }

    public boolean isRequested() {
        return requested;
    }

    public void setRequested(boolean requested) {
        this.requested = requested;
    }
}
