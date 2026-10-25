import { defineConfig } from 'vite';

export default defineConfig({
  base: '/w5g/',
  server: {
    host: true,
    port: 5173,
    // Detect edits made by workspace tools even when native file events are missed.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});
