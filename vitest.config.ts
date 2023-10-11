import { resolve } from 'path';
import { defineConfig } from 'vitest/dist/config.js';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        },
    },
    test: {
        globals: true,
    }
});
