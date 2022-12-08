package com.example.septipico.nutzer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FriendsController {

    @Autowired
    private FriendsRepository friendrepo;

    @Autowired
    private NutzerRepository nutzerrepo;

    @GetMapping("/friends/list/{id}")
    public List<Nutzer> friendslist(@PathVariable("id") Long id){
        return goOverList(friendrepo.findAllByAccepted(true), id);
    }

    private List<Nutzer> goOverList(List<Friends> all, Long id){
        List<Nutzer> friendlist = new ArrayList<>();
        for(Friends temp: all){
            if(temp.getSender().equals(id)){
                friendlist.add(nutzerrepo.findNutzerById(temp.getReceiver()));
            } else if (temp.getReceiver().equals(id)) {
                friendlist.add(nutzerrepo.findNutzerById(temp.getSender()));
            }
        }

        return friendlist;
    }

    @GetMapping("/friends/search/{nutzerID}/{sucherID}")
    public boolean searchFriendRequests(@PathVariable("nutzerID") String nutzerID, @PathVariable("sucherID") String sucherID) {
        long receiver = Integer.parseInt(nutzerID);
        long sender = Integer.parseInt(sucherID);

        List<Friends> friendRelations = friendrepo.findAllByReceiverAndSender(receiver, sender);
        friendRelations.addAll(friendrepo.findAllByReceiverAndSender(sender, receiver));

        if(friendRelations.isEmpty()) {
            Friends friends = new Friends();
            friends.setReceiver(receiver);
            friends.setSender(sender);
            friends.setAccepted(false);
            friendrepo.save(friends);
        }

        return friendRelations.isEmpty();
    }
}
