package com.example.septipico.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileRepository fileRepository;

//    @PostMapping("/delete")
//    public void deletePicture(@RequestBody SEPFile file) {
//
//        fileRepository.deleteById(file.getId());
//    }

    @PostMapping("/save")
    public void savePicture(@ModelAttribute SEPFile file) {
        System.out.println(file.getFile().length() + " " + file.getFile().getName());
        fileRepository.save(file);

    }

    @GetMapping("/all")
    public List<SEPFile> getAllPictures() {
        System.out.println(fileRepository.findAll().size());
        return fileRepository.findAll();
    }
//
//    @PostMapping("/get")
//    public Optional<SEPFile> getPicture(@RequestBody SEPFile file) {
//        Optional<SEPFile> p = fileRepository.findById(file.getId());
//        return p;
//    }


}
