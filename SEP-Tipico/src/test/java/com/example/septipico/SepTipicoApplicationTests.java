package com.example.septipico;

import com.example.septipico.GeldWette.WettBeantragen;
import com.example.septipico.GeldWette.WettController;
import com.example.septipico.TippRunde.TippRundeController;
import com.example.septipico.TwoFa.TwoFaCode;
import com.example.septipico.TwoFa.TwoFaController;
import com.example.septipico.chat.ChatController;
import com.example.septipico.chat.ChatRepository;
import com.example.septipico.chat.Chats;
import com.example.septipico.nutzer.Nutzer;
import com.example.septipico.nutzer.NutzerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootTest
class SepTipicoApplicationTests {

    private static TwoFaController test;
    private static TwoFaCode code;
    private static TippRundeController tippRundeController;

    @Autowired
    private ChatController chatController;

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private NutzerRepository nutzerRepository;
    @Autowired
    private WettController wettController;

    @BeforeAll
    public static void initTwoFaController() {
        test = new TwoFaController();
        code = new TwoFaCode("TestCode", "Test@test.com");
        tippRundeController = new TippRundeController();

    }


    @Test
    public void testTwoFa() {
        Assertions.assertEquals("TestCode", code.getTwofa());
        Assertions.assertEquals("Test@test.com", code.getMail());
        Assertions.assertEquals("TestCode", test.sendMail(code).getTwofa());
    }

    @Test
    void contextLoads() {
    }

    @Test
    void testCheckDate() {
        Assertions.assertTrue(tippRundeController.checkDate("2020-12-09", "09.12.2020"));
    }

    private Long getLong() {
        long leftLimit = 100000000000000000L;
        long rightLimit = 9223372036854775807L;
        return leftLimit + (long) (Math.random() * (rightLimit - leftLimit));

    }


    @Test
    @Transactional
    void testWetteBeantragen() {
        Nutzer nutzer = new Nutzer();
        nutzer.setFirstName(getLong().toString());
        nutzer.setLastName(getLong().toString());
        nutzer.setEmail(getLong() + "@" + "testmail.com");
        nutzer.setRole("admin");
        nutzerRepository.save(nutzer);
        WettBeantragen wettBeantragen = new WettBeantragen();
        wettBeantragen.setSenderName(nutzer.getFirstName());
        wettBeantragen.setUserMail(nutzer.getEmail());
        Assertions.assertEquals(wettController.sendTipp(wettBeantragen), wettBeantragen);
        nutzerRepository.delete(nutzer);
    }

    @Test
    @Transactional
    void testDeleteMyRequest() {
        List<Long> list = new ArrayList<Long>();
        list.add(getLong());
        list.add(getLong());
        for (Long participant : list) {
            List<Chats> chatsList = chatRepository.findChatsByParticipantsContaining(participant);
            Assertions.assertEquals(chatsList.size(), 0);
        }

        String chatIdString = chatController.sendRequest(list);
        Chats c = chatRepository.findChatsById(Long.parseLong(chatIdString));
        Assertions.assertNotNull(c);
        Assertions.assertFalse(Collections.disjoint(c.getParticipants(), list));
    }

}
