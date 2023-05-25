import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Analytics Bundle',
      // the proper extensions will be added
      fileName: 'analytics-essentials',
    },
    rollupOptions: { external: ['react'] },
  },
  plugins: [react(), dts({ insertTypesEntry: true })],
});
