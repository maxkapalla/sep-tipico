package com.example.septipico;

import com.example.septipico.TippRunde.TippRundeController;
import com.example.septipico.TwoFa.TwoFaCode;
import com.example.septipico.TwoFa.TwoFaController;
import com.example.septipico.chat.ChatController;
import com.example.septipico.chat.ChatRepository;
import com.example.septipico.chat.Chats;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Test
    @Transactional
    void testDeleteMyRequest() {
        List<Long> list = new ArrayList<Long>();
        list.add(20l);
        list.add(10l);

        String chatIdString = chatController.sendRequest(list);
        Chats c = chatRepository.findChatsById(Long.parseLong(chatIdString));
        Assertions.assertNotNull(c);
    }

}
