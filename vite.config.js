import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3818
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'ReactLogin',
            fileName: (format) => `auth-package.${format}.js`
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router-dom', 'jwt-decode'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                    'jwt-decode': 'jwtDecode'
                },
                assetFileNames: 'assets/[name][extname]'
            }
        },
        outDir: 'dist'
    }
});