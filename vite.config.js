import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fs from 'fs'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getAutoImportStores = () => {
  const storesDir = path.resolve(__dirname, 'src/stores')
  const storeImports = []
  const excludeFiles = ['index.js', 'index.ts', '.d.ts', 'utils.js']

  if (fs.existsSync(storesDir)) {
    const files = fs.readdirSync(storesDir)

    files.forEach(file => {
      if (excludeFiles.includes(file) || !/\.(js|ts)$/.test(file)) return
      const filePath = path.join(storesDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const storeNameReg = /export\s+(const|let|function)\s+(use\w+Store)\s*=/g
      let match

      while ((match = storeNameReg.exec(fileContent)) !== null) {
        const storeName = match[2]
        const relativePath = `@/stores/${file.replace(/\.(js|ts)$/, '')}`
        storeImports.push({
          [relativePath]: [[storeName, storeName]]
        })
      }
    })
  }

  return storeImports
}
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/router': [
            ['default', 'router'],
          ]
        },
        {
           "qrcodejs2-fix":[
            ['default', 'QRCode']
          ]
        },
        ...getAutoImportStores()
      ],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          icons: true,
        }),
      ],
      dts: path.resolve(__dirname, 'src/auto-imports.d.ts'),
      eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.json' }
    }),
    Components({
      dirs: [path.resolve(__dirname, 'src/components')],
      dts: path.resolve(__dirname, 'src/components.d.ts'),
      directoryAsNamespace: false,
      extensions: ['vue'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          icons: true,
        }),
      ]
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  }
})