# CV Parser Web Application

A modern, full-stack CV/Resume parser web application for QA and Software Developer portfolio demonstration.

---

## 🚀 Features
- **Upload CVs (PDF, DOC, DOCX)** and extract candidate information instantly
- **Beautiful, modern React + Vite + TypeScript frontend**
- **Spring Boot backend** with REST API and H2 database
- **Candidate list** with all parsed uploads
- **Detail page** for each parsed CV
- **Compare** current CV with previous uploads
- **Clickable header** for easy navigation
- **Full E2E test coverage** (Cypress, Playwright, Selenium, Cucumber)
- **Well-structured, well-tested, and visually impressive**

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TypeScript, CSS
- **Backend:** Java, Spring Boot, Spring Data JPA, H2 (dev), MySQL (prod-ready)
- **PDF Parsing:** Apache PDFBox
- **Testing:**
  - **Backend:** JUnit, Cucumber (BDD), Selenium (E2E)
  - **Frontend:** Cypress (E2E), Playwright (E2E)

---

## 📁 Project Structure
```
CVParser/
├── cv-parser-app/
│   ├── backend/         # Spring Boot backend
│   │   ├── src/main/java/com/example/cvparser/
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── service/     # Business logic
│   │   │   ├── model/       # JPA entities
│   │   │   ├── repository/  # Spring Data repositories
│   │   ├── src/test/java/com/example/cvparser/ # JUnit, Cucumber, Selenium tests
│   │   ├── src/test/resources/features/        # Cucumber .feature files
│   ├── frontend/         # React + Vite frontend
│   │   ├── src/          # React components, types, api
│   │   ├── cypress/      # Cypress E2E tests & fixtures
│   │   ├── tests/        # Playwright E2E tests
│   │   ├── public/       # Static assets
│   │   ├── package.json  # Frontend dependencies
│   │   ├── cypress.config.cjs # Cypress config
│   │   ├── vite.config.ts     # Vite config
│   │   └── README.md    # (You are here)
```

---

## ⚡ Quick Start

### 1. **Backend**
```sh
cd cv-parser-app/backend
mvn spring-boot:run
```
- Runs on [http://localhost:8080](http://localhost:8080)

### 2. **Frontend**
```sh
cd cv-parser-app/frontend
npm install
npm run dev
```
- Runs on [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

### **Backend**
- **JUnit:**
  ```sh
  cd cv-parser-app/backend
  mvn test
  ```
- **Cucumber (BDD):**
  - Feature files: `src/test/resources/features/`
  - Step definitions: `src/test/java/com/example/cvparser/`
- **Selenium (E2E):**
  - Tests in `src/test/java/com/example/cvparser/`
  - Uses ChromeDriver, uploads a real PDF, checks UI

### **Frontend**
- **Cypress:**
  ```sh
  cd cv-parser-app/frontend
  npx cypress run
  # or for interactive UI
  npx cypress open
  ```
- **Playwright:**
  ```sh
  cd cv-parser-app/frontend
  npx playwright test
  ```
- **Test PDF:**
  - Located at `frontend/cypress/fixtures/test-cv.pdf`

---

## 🖥️ Usage
1. **Upload a CV** (PDF/DOC/DOCX) on the main page
2. **View parsed candidate info** instantly
3. **Compare** with previous uploads
4. **See all candidates** in the list
5. **Click the header** to return home at any time

---

## 📝 Example CV Data Extracted
- Name
- Email
- Phone
- Education
- Experience
- Skills

---

## 🧑‍💻 For Developers
- **Add new fields:** Update both backend `Candidate` entity and frontend `Candidate` type/component
- **Add new tests:** Place Cypress/Playwright tests in `frontend/`, Selenium/Cucumber in backend test dir
- **Change DB:** Update `application.properties` for MySQL/Postgres
- **API endpoints:**
  - `POST /api/cv/upload` — Upload and parse a CV
  - `GET /api/cv/candidates` — List all candidates
  - `GET /api/cv/candidate/{id}` — Get candidate by ID
  - `GET /api/cv/compare/{id}` — Compare with previous uploads

---

## 🤝 Contributing
PRs and suggestions welcome! This project is designed for learning, QA, and portfolio demonstration.

---

## 📣 Credits
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Cypress](https://www.cypress.io/)
- [Playwright](https://playwright.dev/)
- [Selenium](https://www.selenium.dev/)
- [Cucumber](https://cucumber.io/)
- [PDFBox](https://pdfbox.apache.org/)

---

**Enjoy parsing CVs and showing off your QA/dev skills!** 