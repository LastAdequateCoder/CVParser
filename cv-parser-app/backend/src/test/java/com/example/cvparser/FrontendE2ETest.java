package com.example.cvparser;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

public class FrontendE2ETest {
    private static WebDriver driver;
    private static File testPdf;

    @BeforeAll
    public static void setup() throws IOException {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        // Comment out the next line if you want to see the browser
        // options.addArguments("--headless=new");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        // Generate a minimal PDF file
        testPdf = File.createTempFile("test-cv", ".pdf");
        try (PDDocument doc = new PDDocument()) {
            PDPage page = new PDPage();
            doc.addPage(page);
            try (PDPageContentStream content = new PDPageContentStream(doc, page)) {
                content.beginText();
                content.setFont(PDType1Font.HELVETICA_BOLD, 12);
                content.newLineAtOffset(50, 700);
                content.showText("Jane Doe");
                content.newLineAtOffset(0, -20);
                content.showText("jane@example.com");
                content.newLineAtOffset(0, -20);
                content.showText("+9876543210");
                content.newLineAtOffset(0, -20);
                content.showText("Master of Science");
                content.newLineAtOffset(0, -20);
                content.showText("3 years experience");
                content.newLineAtOffset(0, -20);
                content.showText("Skills: Python, Selenium");
                content.endText();
            }
            doc.save(new FileOutputStream(testPdf));
        }
    }

    @AfterAll
    public static void teardown() {
        if (driver != null) driver.quit();
        if (testPdf != null && testPdf.exists()) testPdf.delete();
    }

    @Test
    public void testUploadAndParseCV() throws InterruptedException {
        driver.get("http://localhost:5173/");
        // Upload the PDF
        WebElement fileInput = driver.findElement(By.cssSelector("input[type='file']"));
        fileInput.sendKeys(testPdf.getAbsolutePath());
        WebElement uploadBtn = driver.findElement(By.cssSelector("button[type='submit']"));
        uploadBtn.click();
        // Wait for navigation to parsed CV page
        Thread.sleep(2000); // Replace with better wait if needed
        // Check for parsed candidate info
        String pageSource = driver.getPageSource();
        assertThat(pageSource).contains("Jane Doe");
        assertThat(pageSource).contains("jane@example.com");
        assertThat(pageSource).contains("9876543210");
        assertThat(pageSource).contains("Master of Science");
        assertThat(pageSource).contains("3 years experience");
        assertThat(pageSource).contains("Python, Selenium");
        // Click compare button
        WebElement compareBtn = driver.findElement(By.xpath("//button[contains(text(),'Compare')]"));
        compareBtn.click();
        Thread.sleep(1000); // Wait for comparison page
        String comparePage = driver.getPageSource();
        assertThat(comparePage).contains("Current CV");
        assertThat(comparePage).contains("Previous Uploads");
    }
} 