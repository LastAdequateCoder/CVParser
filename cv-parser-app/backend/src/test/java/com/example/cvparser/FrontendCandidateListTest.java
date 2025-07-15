package com.example.cvparser;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.io.File;
import java.io.IOException;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FrontendCandidateListTest {
    private WebDriver driver;
    private File testPdf;

    @BeforeAll
    public void setup() throws IOException {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        // Canonical path for the test PDF
        testPdf = new File("../../frontend/cypress/fixtures/test-cv.pdf").getCanonicalFile();
    }

    @AfterAll
    public void teardown() {
        if (driver != null) driver.quit();
    }

    @Test
    public void candidateAppearsInListAfterUpload() throws InterruptedException {
        driver.get("http://localhost:5173/");
        driver.findElement(By.cssSelector("input[type='file']")).sendKeys(testPdf.getAbsolutePath());
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        Thread.sleep(2000); // Wait for upload and navigation
        driver.get("http://localhost:5173/"); // Go back to main page

        // Wait up to 10 seconds for the candidate to appear in the table
        boolean found = false;
        for (int i = 0; i < 10; i++) {
            try {
                WebElement table = driver.findElement(By.tagName("table"));
                if (table.getText().contains("Jane Doe")) {
                    found = true;
                    break;
                }
            } catch (NoSuchElementException e) {
                // Table not yet present
            }
            Thread.sleep(1000);
        }
        Assertions.assertTrue(found, "Candidate 'Jane Doe' not found in the table after upload.");
        // Optionally, also check for email
        WebElement table = driver.findElement(By.tagName("table"));
        Assertions.assertTrue(table.getText().contains("jane@example.com"));
    }
} 