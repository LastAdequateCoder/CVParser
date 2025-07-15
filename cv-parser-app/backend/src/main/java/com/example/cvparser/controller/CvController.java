package com.example.cvparser.controller;

import com.example.cvparser.model.Candidate;
import com.example.cvparser.service.CvParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "*")
public class CvController {

    @Autowired
    private CvParserService cvParserService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file) {
        try {
            Candidate candidate = cvParserService.parseCv(file);
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to parse CV: " + e.getMessage());
        }
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = cvParserService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/candidate/{id}")
    public ResponseEntity<?> getCandidateById(@PathVariable Long id) {
        Optional<Candidate> candidate = cvParserService.getCandidateById(id);
        return candidate.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/compare/{id}")
    public ResponseEntity<List<Candidate>> getPreviousCandidates(@PathVariable Long id) {
        List<Candidate> previous = cvParserService.getPreviousCandidates(id);
        return ResponseEntity.ok(previous);
    }
} 