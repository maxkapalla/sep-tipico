package com.example.septipico.chat;

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

    @GetMapping("/chat/checkRequests/{id}")
    public boolean checkForRequests(@PathVariable Long id){
        List<Chats> all = this.chatRepo.findAll();
        for (Chats chat: all) {
            if(chat.getParticipants().get(1).equals(id)){
                return false;
            }
        }
        return true;
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

}
