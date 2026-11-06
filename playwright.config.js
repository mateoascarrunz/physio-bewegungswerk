import { defineConfig, devices } from '@playwright/test';

const previewUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  // CI keeps an HTML report and traces of failures, and states each failure as an annotation
  // on the run, which can be read without signing in to GitHub.
  reporter: process.env.CI ? [['list'], ['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: previewUrl ?? 'http://localhost:4173',
    trace: process.env.CI ? 'retain-on-failure' : 'off',
  },
  webServer: previewUrl ? undefined : { command: 'node scripts/serve.mjs --port 4173', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
