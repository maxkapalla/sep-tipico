package com.example.septipico;

import com.example.septipico.TwoFa.TwoFaCode;
import com.example.septipico.TwoFa.TwoFaController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SepTipicoApplicationTests {

    private static TwoFaController test;
    private static TwoFaCode code;

    @BeforeAll
    public static void initTwoFaController() {
        test = new TwoFaController();
        code = new TwoFaCode("TestCode", "Test@test.com");
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

}
