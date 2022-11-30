package com.example.septipico.liga;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CsvReader {

    public static void readCsv(String filepath) throws FileNotFoundException {
        List<List<String>> spielplaene = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filepath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                spielplaene.add(Arrays.asList(values));
                System.out.println(Arrays.asList(values));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
