package com.example.cvparser;

import com.example.cvparser.model.Candidate;
import com.example.cvparser.service.CvParserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.mock.web.MockMultipartFile;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
class CvParserApplicationTests {

    @SpyBean
    private CvParserService cvParserService;

    @Test
    void contextLoads() {
    }

    @Test
    void testParseCvAndSave() throws Exception {
        String fakePdfContent = "John Doe\njohn@example.com\n+1234567890\nBachelor of Science\n5 years experience\nSkills: Java, Selenium";
        Mockito.doReturn(fakePdfContent)
                .when(cvParserService).extractTextFromPdf(any(MockMultipartFile.class));
        MockMultipartFile file = new MockMultipartFile("file", "cv.pdf", "application/pdf", fakePdfContent.getBytes());
        Candidate candidate = cvParserService.parseCv(file);
        assertThat(candidate.getName()).isEqualTo("John Doe");
        assertThat(candidate.getEmail()).isEqualTo("john@example.com");
        assertThat(candidate.getPhone()).contains("1234567890");
        assertThat(candidate.getEducation().toLowerCase()).contains("bachelor");
        assertThat(candidate.getExperience().toLowerCase()).contains("experience");
    }
}