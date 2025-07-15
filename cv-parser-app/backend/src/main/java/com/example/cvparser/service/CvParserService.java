package com.example.cvparser.service;

import com.example.cvparser.model.Candidate;
import com.example.cvparser.repository.CvRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CvParserService {

    @Autowired
    private CvRepository cvRepository;

    public Candidate parseCv(MultipartFile file) {
        String text = extractTextFromPdf(file);
        Candidate candidate = extractCandidateFromText(text);
        return cvRepository.save(candidate);
    }

    public String extractTextFromPdf(MultipartFile file) {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse PDF", e);
        }
    }

    private Candidate extractCandidateFromText(String text) {
        Candidate candidate = new Candidate();
        candidate.setName(extractName(text));
        candidate.setEmail(extractEmail(text));
        candidate.setPhone(extractPhone(text));
        candidate.setEducation(extractEducation(text));
        candidate.setExperience(extractExperience(text));
        candidate.setSkills(extractSkills(text));
        return candidate;
    }

    // Simple regex-based extractors (improve as needed)
    private String extractName(String text) {
        String[] lines = text.split("\n");
        return lines.length > 0 ? lines[0].trim() : "Unknown";
    }

    private String extractEmail(String text) {
        Matcher matcher = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").matcher(text);
        return matcher.find() ? matcher.group() : "Unknown";
    }

    private String extractPhone(String text) {
        Matcher matcher = Pattern.compile("(\\+\\d{1,3}[- ]?)?\\d{10,}").matcher(text);
        return matcher.find() ? matcher.group() : "Unknown";
    }

    private String extractEducation(String text) {
        Matcher matcher = Pattern.compile("(?i)(Bachelor|Master|BSc|MSc|PhD|Diploma)[^\\n]*").matcher(text);
        return matcher.find() ? matcher.group() : "Unknown";
    }

    private String extractExperience(String text) {
        Matcher matcher = Pattern.compile("(?i)^.*experience.*$", Pattern.MULTILINE).matcher(text);
        return matcher.find() ? matcher.group().trim() : "Unknown";
    }

    private String extractSkills(String text) {
        Matcher matcher = Pattern.compile("(?i)(skills?)[^\\n]*").matcher(text);
        return matcher.find() ? matcher.group() : "Unknown";
    }

    public List<Candidate> getAllCandidates() {
        return cvRepository.findAll();
    }

    public Optional<Candidate> getCandidateById(Long id) {
        return cvRepository.findById(id);
    }

    public List<Candidate> getPreviousCandidates(Long currentId) {
        return cvRepository.findByIdNot(currentId);
    }
} 