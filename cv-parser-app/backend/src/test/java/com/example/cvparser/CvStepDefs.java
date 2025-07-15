package com.example.cvparser;

import io.cucumber.spring.CucumberContextConfiguration;
import com.example.cvparser.model.Candidate;
import com.example.cvparser.service.CvParserService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@CucumberContextConfiguration
@SpringBootTest
public class CvStepDefs {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mockMvc;
    private String response;

    @SpyBean
    private CvParserService cvParserService;

    private final String fakePdfContent = "Jane Doe\njane@example.com\n+9876543210\nMaster of Science\n3 years experience\nSkills: Python, Selenium";

    @Given("the backend is running")
    public void backend_is_running() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Mockito.doReturn(fakePdfContent)
                .when(cvParserService).extractTextFromPdf(any(MockMultipartFile.class));
    }

    @When("I upload a CV file")
    public void i_upload_a_cv_file() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "cv.pdf", "application/pdf", fakePdfContent.getBytes());
        response = mockMvc.perform(multipart("/api/cv/upload").file(file).contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
    }

    @Then("the candidate should be parsed and saved")
    public void candidate_should_be_parsed_and_saved() {
        assertThat(response).contains("Jane Doe");
        assertThat(response).contains("jane@example.com");
        assertThat(response).contains("9876543210");
        assertThat(response).contains("Master of Science");
        assertThat(response).contains("3 years experience");
        assertThat(response).contains("Python, Selenium");
    }
} 