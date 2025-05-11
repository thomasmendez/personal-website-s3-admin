import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    // include: ['src/**/*.{test}.{ts,tsx}'],
  }
};

export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
});
