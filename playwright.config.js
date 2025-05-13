// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests', // Diretório onde os arquivos de teste estão
  timeout: 60 * 1000, // Timeout para cada teste (60 segundos)
  expect: {
    timeout: 10000 // Timeout para as asserções do expect (10 segundos)
  },
  reporter: 'html', // Gera um relatório HTML
  use: {
    headless: true, // Rodar em modo headless por padrão
    baseURL: 'https://blogdoagi.com.br',
    actionTimeout: 10 * 1000, // Timeout para ações como click, fill (10 segundos)
    navigationTimeout: 30 * 1000, // Timeout para navegação (30 segundos)
    trace: 'on-first-retry', // Grava trace na primeira tentativa falha
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Descomente para testar em outros navegadores
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
};

module.exports = config;
