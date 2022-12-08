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

    @GetMapping("/friends/friendrequest/{sucherID}")
    public List<Nutzer> getFriendRequests(@PathVariable("sucherID") String sucherID) {
        long receiver = Integer.parseInt(sucherID);

        List<Nutzer> friendRequestList = new ArrayList<Nutzer>();

        for(Friends x: friendrepo.findAllByReceiverAndAccepted(receiver, false)) {
            Nutzer friendUser = nutzerrepo.findNutzerById(x.getSender());
            friendRequestList.add(friendUser);
        }

        return friendRequestList;
    }
    @GetMapping("/friends/remove/{nutzerID}/{sucherID}")
    public boolean removeFriend(@PathVariable("nutzerID") String nutzerID, @PathVariable("sucherID") String sucherID) {
        long receiver = Integer.parseInt(nutzerID);
        long sender = Integer.parseInt(sucherID);

        List<Friends> friendList = friendrepo.findAllByReceiverAndSender(receiver, sender);

        for(Friends x: friendList) {
            friendrepo.delete(x);
        }

        return true;
    }
}
