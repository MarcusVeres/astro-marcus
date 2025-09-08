// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'preact-bundle': ['preact', '@astrojs/preact', 'preact/hooks']
          }
        }
      }
    },
    plugins: [tailwindcss()],
  },
  site: "https://astro-marcus.netlify.app",
});
