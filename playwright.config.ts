import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

const playwrightLibs = `${process.env.HOME}/.local/playwright-libs`;

const webkitLibs = [
  playwrightLibs,
  `${process.env.HOME}/.cache/ms-playwright/webkit-2359/minibrowser-gtk/sys/lib`,
  `${process.env.HOME}/.cache/ms-playwright/webkit-2359/minibrowser-gtk/lib`,
  process.env.LD_LIBRARY_PATH || '',
].filter(Boolean).join(':');

const hasArchWebkitLibs = fs.existsSync(playwrightLibs);

export default defineConfig({
  testDir: './tests',

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],

        ...(hasArchWebkitLibs
          ? {
              launchOptions: {
                env: {
                  ...process.env,
                  LD_LIBRARY_PATH: webkitLibs,
                },
              },
            }
          : {}),
      },
    },
  ],
});
