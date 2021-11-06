import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import {defineConfig} from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import {minifyHtml} from 'vite-plugin-html';

export default defineConfig({
    plugins: [
        eslintPlugin({
            cache: false
        }),
        vue(),
        minifyHtml()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 8080
    }
});
