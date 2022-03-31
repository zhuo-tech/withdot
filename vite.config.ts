import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 13000,
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },

})
