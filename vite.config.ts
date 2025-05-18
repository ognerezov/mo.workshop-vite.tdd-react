/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
  },
} as UserConfig)
