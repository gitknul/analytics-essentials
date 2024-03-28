import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: {
                google: resolve(__dirname, 'lib/google/index.ts'),
                mixpanel: resolve(__dirname, 'lib/mixpanel/index.ts'),
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', 'next'],
        },
    },
    plugins: [react(), dts({ include: ['lib'], outDir: ['dist/types'] })],
});
