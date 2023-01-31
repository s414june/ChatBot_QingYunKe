import {
  defineConfig,
  loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       './api': {
//         target: 'http://api.qingyunke.com/api.php',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         secure: false
//       },
//       './convert': {
//         target: 'http://api.zhconvert.org/convert',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/convert/, ''),
//         secure: false
//       }
//     }
//   },
//   base: '/ChatBot_QingYunKe/'
// })

export default ({
  mode
}) => {
  // Load app-level env vars to node-level env vars.
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };

  return defineConfig({
    plugins: [vue()],
    server: {
      proxy: {
        './api': {
          target: 'http://api.qingyunke.com/api.php',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, process.env.ROOT_PATH),
          secure: false
        },
        './convert': {
          target: 'http://api.zhconvert.org/convert',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/convert/, process.env.VITE_ROOT_PATH),
          secure: false
        }
      }
    },
    base: process.env.VITE_ROOT_PATH
  });
}