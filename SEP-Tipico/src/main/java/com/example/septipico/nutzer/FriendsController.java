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

    List<Nutzer> friendsNutzer = new ArrayList<>();
    @GetMapping("/friends/list/{id}")
    public List<Nutzer> friendslist(@PathVariable("id") Long id){
        friendsNutzer.clear();
        goOverList(friendrepo.findAllBySender(id), id);
        goOverList(friendrepo.findAllByReceiver(id), id);

        return this.friendsNutzer;
    }

    private void goOverList(List<Friends> all, Long id){
        for(Friends temp: all){
            System.out.println(temp.getId());
            if(!temp.isAccepted()){
                all.remove(temp);
            }else{
                if(temp.getReceiver() == id){
                    this.friendsNutzer.add(nutzerrepo.findNutzerById(temp.getReceiver()));
                }else{
                    this.friendsNutzer.add(nutzerrepo.findNutzerById(temp.getSender()));
                }
            }
        }
    }

    @GetMapping("/friends/search/{nutzerID}/{sucherID}")
    public boolean searchFriendRequests(@PathVariable("nutzerID") String nutzerID, @PathVariable("sucherID") String sucherID) {
        long receiverID = Integer.parseInt(nutzerID);
        long senderID = Integer.parseInt(sucherID);

        List<Friends> friendRelations = friendrepo.findAllByReceiverOrSender(receiverID, senderID);

        System.out.println(friendRelations.isEmpty() + " " + friendRelations.size()+ " " + receiverID + " " + senderID);

        return friendRelations.isEmpty();
    }
}
