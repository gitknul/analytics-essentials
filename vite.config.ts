import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'main',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', 'next'],
            output: {
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    plugins: [react(), dts({ include: ['lib'], rollupTypes: true })],
});
