import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx({}),
    ],
    server: {
        port: 13000,
    },
    envDir: './env',
    envPrefix: ['VUE_APP_'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },

})
