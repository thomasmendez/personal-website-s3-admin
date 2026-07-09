import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',        
      globals: true,               
      // setupFiles: ['./src/setupTests.ts'],  
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: ['node_modules', 'src/tests/e2e'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
      },
    },
  })
)