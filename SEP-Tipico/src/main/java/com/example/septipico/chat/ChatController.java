package com.example.septipico.chat;

import com.example.septipico.TippRunde.TippRunde;
import com.example.septipico.TippRunde.TippRundeRepository;
import com.example.septipico.nutzer.Nutzer;
import com.example.septipico.nutzer.NutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    @Autowired
    private ChatRepository chatRepo;

    @Autowired
    private MessageRepository msgRepo;

    @Autowired
    private TippRundeRepository trRepo;

    @Autowired
    private NutzerRepository nutzerRepo;

    @GetMapping("/chat/requests/{id}")
    public List<Chats> getRequests(@PathVariable("id") Long id){
        List<Chats> all= chatRepo.findAll();
        List<Chats> requests = new ArrayList<>();
        for(Chats chat: all){
            if(chat.isRequested() && chat.getParticipants().get(0).equals(id)){
                requests.add(chat);
            }
        }
        return requests;
    }

    @PostMapping("/chat/request")
    public String sendRequest(@RequestBody List<Long> ids){
        System.out.println("Request received");
        List<Chats> all= chatRepo.findAll();
        if (all.size() != 0) {
            for(Chats chat: all){
                if(!(chat.getParticipants().get(1).equals(ids.get(1)))){
                    chatRepo.save(new Chats(ids, true));
                }
            }
        }else{
            chatRepo.save(new Chats(ids, true));
        }

        return getIdOfChat(ids);
    }

    @GetMapping("/chat/accept/{id}")
    public Chats acceptRequest(@PathVariable("id") Long chatID){
        Chats chat = chatRepo.findChatsById(chatID);
        System.out.println("Wird angenommen");
        chat.setRequested(false);
        chatRepo.save(chat);
        List<Long> part = chatRepo.findChatsById(chatID).getParticipants();
        Nutzer me = nutzerRepo.findNutzerById(part.get(0));
        this.sendJoinMsg(me, chatID);
        return chat;
    }

    @GetMapping("/chat/reject/{id}")
    public void rejectRequest(@PathVariable("id") Long chatID){
        Chats chat = chatRepo.findChatsById(chatID);
        System.out.println("Wird abgelehnt");
        chatRepo.delete(chat);
    }

    @GetMapping("/chat/myChat/{myID}")
    public Chats findActiveChat(@PathVariable("myID") Long myID){
        List<Chats> chat = chatRepo.findChatsByRequestedIsFalse();
        for(Chats mine: chat){
            if(mine.getParticipants().contains(myID))
                return mine;
        }
        return null;
    }

    @PostMapping("/chat/endChat")
    public void endChat(@RequestBody Chats chat){
        this.chatRepo.delete(chat);
        for(Message msg : this.msgRepo.findMessagesByChatID(chat.getId()))
            this.msgRepo.delete(msg);

    }

    @PostMapping("/chat/sndMsg")
    public void sendMsg(@RequestBody Message message){
        this.msgRepo.save(message);
    }

    @GetMapping("/chat/getMsg/{chatid}")
    public List<Message> getMessages(@PathVariable("chatid") Long chatid){
        return this.msgRepo.findMessagesByChatID(chatid);
    }

    @GetMapping("/chat/myRequests/{id}")
    public List<Chats> getMySentRequests(@PathVariable Long id){
        List<Chats> all = this.chatRepo.findAll();
        List<Chats> sent = new ArrayList<>();
        for (Chats chat: all) {
            if(chat.getParticipants().get(1).equals(id)){
                sent.add(chat);
            }
        }
        return sent;
    }


    @GetMapping("/chat/joinRundenChat/{runde}/{userid}")
    public Chats joinRundenChat(@PathVariable("runde")Long rundeID, @PathVariable("userid")Long userid){
        TippRunde runde = trRepo.findTippRundeById(rundeID);
        Chats chat =  this.chatRepo.findChatsById(runde.getChatID());
        List<Long> participants = chat.getParticipants();
        Nutzer me = this.nutzerRepo.findNutzerById(userid);
        participants.add(userid);
        chat.setParticipants(participants);
        this.chatRepo.save(chat);
        this.sendJoinMsg(me, chat.getId());
        return chat;
    }

    @GetMapping("/chat/leaveRundenChat/{chat}/{userid}")
    public Chats leaveRundenChat(@PathVariable("chat") Long chatID, @PathVariable("userid") Long userid){
        Chats chat =  this.chatRepo.findChatsById(chatID);
        Nutzer me = this.nutzerRepo.findNutzerById(userid);
        List<Long> participants = chat.getParticipants();
        participants.remove(userid);
        this.chatRepo.save(chat);
        sendLeaveMsg(me, chat.getId());
        return chat;
    }

    @GetMapping("/chat/tipprundenChat")
    public Chats createChatTR(){
        Chats chat = this.chatRepo.save(new Chats(new ArrayList<>(), false));
        return chat;
    }

    @PostMapping("/chat/deleteRequests")
    public void deleteMyRequests(@RequestBody Long[] participants){
        List<Chats> all = this.chatRepo.findChatsByRequestedIsTrue();
        System.out.println("delete start");
        for(Chats chat: all){
            System.out.println("looking at chat");
            if(chat.getParticipants().get(1).equals(participants[0]) || chat.getParticipants().get(1).equals(participants[1])) {
                System.out.println("gets deleted");
                this.chatRepo.delete(chat);
            }
        }
    }


    private String getIdOfChat(List<Long> ids){
        List<Chats> all= chatRepo.findAll();
        for(Chats chat: all){
            if((chat.getParticipants().contains(ids.get(0)) && chat.getParticipants().contains(ids.get(1)))){
                return chat.getId().toString();
            }
        }
        return "0";
    }

    private void sendJoinMsg(Nutzer me, Long chatID){
        Message msg = new Message();
        msg.setChatID(chatID);
        msg.setContent("ist dem Chat beigetreten.");
        msg.setSender(me.getId());
        msg.setName(me.getFirstName() + " " + me.getLastName());
        msgRepo.save(msg);
    }

    private void sendLeaveMsg(Nutzer me, Long chatID){
        Message msg = new Message();
        msg.setChatID(chatID);
        msg.setContent("hat den Chat verlassen.");
        msg.setSender(me.getId());
        msg.setName(me.getFirstName() + " " + me.getLastName());
        msgRepo.save(msg);
    }

}
