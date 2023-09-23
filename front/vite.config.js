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
        '/api': {
          // target: 'http://api.qingyunke.com/api.php',
          // target: 'http://localhost/chatbotapitest/api.php',
          target: 'https://chatbot-qingyunke.great-site.net/api.php',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true
        },
        '/convert': {
          // target: 'http://localhost/chatbotapitest/convert.php',
          target: 'https://api.zhconvert.org/convert',
          // target: 'https://chatbot-qingyunke.great-site.net/convert.php',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/convert/, ''),
          secure: false,
          ws: true
        }
      }
    },
    base: process.env.VITE_ROOT_PATH,
    resolve: {
      extensions: ['.ts', '.js']
    },
    build: {
      outDir:process.env.VITE_OUTDIR_PATH,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          assetFileNames: 'assets/[name].[ext]',
        }
      }
    }
  });
}