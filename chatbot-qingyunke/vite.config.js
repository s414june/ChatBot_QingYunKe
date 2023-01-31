import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.qingyunke.com/api.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
      '/convert': {
        target: 'http://api.zhconvert.org/convert',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/convert/, ''),
        secure: false
      }
    }
  },
  base: '/ChatBot_QingYunKe/'
})