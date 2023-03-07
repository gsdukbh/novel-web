import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import CompressionPlugin from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3100,
    },
    plugins: [
        vue(),
        vueJsx(),
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
        // 使用 gzip 压缩
        CompressionPlugin({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240,
            deleteOriginFile: false,
        })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    optimizeDeps: {
        include: [
            'ant-design-vue/es/locale/zh_CN'
        ],
    },
})
