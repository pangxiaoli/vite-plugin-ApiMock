import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
            name: 'vitePluginApiMock',
            fileName: 'index',
        },
        rollupOptions: {
            output: {
                format: 'es',
                dir: path.resolve(__dirname, 'dist'),
            },
        },
    },
});
