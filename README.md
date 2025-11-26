# Foody Playwright Framework

Automated UI and API testing framework built with Playwright, TypeScript, and the Page Object Model (POM) pattern — tailored for the "Foody" application.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation & Local Setup](#installation--local-setup)
- [Test Commands](#test-commands)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Environment Variables / Secrets](#environment-variables--secrets)
- [Reports & Test Results](#reports--test-results)

---

## Overview

This project provides a reusable and extensible automation test framework for the “Foody” application. It supports:

- UI end-to-end tests using Playwright with Page Object Model for maintainability and scalability.
- API testing (HTTP / backend interactions) alongside UI tests.
- Smoke / API-only test suites.
- Generation of test reports (HTML or other configured reporters).
- CI/CD pipeline via GitHub Actions for automated test runs and report publishing.

---

## Project Structure

```Bash
/
├─ fixtures/ # fixtures, helpers (API clients, test data, utilities)
├─ pages/ # Page Object Model classes (UI page abstractions)
├─ test-data # test data json files
├─ tests/ # test files (UI + API + end-to-end)
├─ .github/workflows/ # GitHub Actions workflows for CI/CD
├─ playwright.config.ts # Playwright configuration
├─ tsconfig.json # TypeScript configuration
├─ package.json # NPM dependencies & scripts
├─ README.md # this file
└─ .gitignore
```

---

## Requirements

- Node.js (v18 or later recommended)
- Playwright + browsers installed (Chromium, Firefox, WebKit as needed)
- Git
- Access to the Foody application under test (UI URL and/or API endpoints)

---

## Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YordanPopov/foody-PW-Framework.git
   cd foody-PW-Framework
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env (or environment-specific) file with required variables. Example variables might include:
   ```Bash
   URL=https://your-foody-app-url.com
   API_URL=https://your-foody-api-url.com
   EMAIL=youruser@example.com
   PASSWORD=yourPassword
   USER_NAME=yourUserName
   FIRST_NAME=yourFirstName
   MIDDLE_NAME=yourMiddleName
   LAST_NAME=yourLastName
   ```

---

## Test Comands

```Bash
# Run all tests
npm run test

# Run smoke tests only
npm run smoke

# Run API tests only
npm run api
```

---

## CI/CD with GitHub Actions

```Plaintext
The workflows are triggered:
-on push to main
-manually with workflow_dispatch

Pipeline steps:

1.Setup → Node.js, Playwright, dependencies
2.Run smoke tests and API tests
3.Upload blob reports
4.Merge into a single HTML report
5.Publish the HTML report to GitHub Pages
```

---

## Secrets & Environment Variables

The following secrets must be set in GitHib Repository Settings > Secrets > Actions

| Secret        | Description                                  |
| ------------- | -------------------------------------------- |
| `API_URL`     | Base API URL                                 |
| `URL`         | Base UI URL                                  |
| `EMAIL`       | User email for login / API authentication    |
| `PASSWORD`    | User password for login / API authentication |
| `USER_NAME`   | Username for UI tests                        |
| `FIRST_NAME`  | First name for tests                         |
| `LAST_NAME`   | Last name for tests                          |
| `MIDDLE_NAME` | (Optional)middle name for tests              |

---

## Reports & GitHub Pages

- Playwright tests generate blob reports (--reporter=blob)
- Blob files are merged into a single HTML report:

```bash
npx playwright merge-reports --reporter html ./all-blob-reports
```

---
