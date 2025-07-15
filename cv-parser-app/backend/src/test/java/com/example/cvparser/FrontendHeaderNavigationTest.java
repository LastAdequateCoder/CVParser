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
public class FrontendHeaderNavigationTest {
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
    public void headerNavigatesToMainPage() throws InterruptedException {
        driver.get("http://localhost:5173/");
        driver.findElement(By.cssSelector("input[type='file']")).sendKeys(testPdf.getAbsolutePath());
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        Thread.sleep(2000); // Wait for navigation
        driver.findElement(By.cssSelector(".header-title")).click();
        Thread.sleep(1000); // Wait for navigation
        Assertions.assertTrue(driver.getCurrentUrl().endsWith("/"));
        Assertions.assertTrue(driver.getPageSource().contains("Upload CV"));
    }
} 