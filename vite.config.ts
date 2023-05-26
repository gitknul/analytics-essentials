import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: [
                resolve(__dirname, 'src/index.ts'),
                resolve(__dirname, 'src/next/next.ts'),
            ],
            name: 'Analytics Essentials',
        },
        rollupOptions: { external: ['react'] },
    },
    plugins: [react(), dts()],
});
