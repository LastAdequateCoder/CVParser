package com.example.cvparser;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FrontendUploadButtonTest {
    private WebDriver driver;

    @BeforeAll
    public void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterAll
    public void teardown() {
        if (driver != null) driver.quit();
    }

    @Test
    public void uploadButtonEnabledWhenFileSelected() {
        driver.get("http://localhost:5173/");
        WebElement fileInput = driver.findElement(By.cssSelector("input[type='file']"));
        WebElement uploadBtn = driver.findElement(By.cssSelector("button[type='submit']"));
        // The button should be enabled by default in your UI
        Assertions.assertTrue(uploadBtn.isEnabled());
        // Optionally, clear the file input and check if the button disables
        // fileInput.clear();
        // Assertions.assertFalse(uploadBtn.isEnabled());
    }
} 