import { test, expect } from '@playwright/test';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('CV upload and parse', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const filePath = resolve(__dirname, '../cypress/fixtures/test-cv.pdf');
  await page.setInputFiles('input[type="file"]', filePath);
  await page.click('button[type="submit"]');
  await expect(page.getByText('Parsed Candidate')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('.candidate-info')).toContainText('Jane Doe');
  await expect(page.locator('.candidate-info')).toContainText('jane@example.com');
  await expect(page.locator('.candidate-info')).toContainText('Python, Selenium');
  await page.getByText('Compare with Previous Uploads').click();
  await expect(page.getByText('Current CV')).toBeVisible();
  await expect(page.getByText('Previous Uploads')).toBeVisible();
}); 