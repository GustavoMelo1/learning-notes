import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { createSidebar } from './sidebar'

// Content lives one level up (repo root), outside this workspace's node_modules.
// Vite resolves bare imports by walking up from the file being processed, so
// markdown files in ../bi, ../sql etc. can't find "vue/server-renderer" on
// their own — point it explicitly at this workspace's copy.
const resolvePkg = (pkg: string) =>
  fileURLToPath(new URL(`../node_modules/${pkg}`, import.meta.url))

const vitePressOptions = defineConfig({
  title: 'Learning Notes',
  lang: 'pt-BR',
  description: "Gustavo's notes on SQL, Python, BI and data engineering",
  base: '/learning-notes/',
  srcDir: '..',
  srcExclude: ['.frontend/**', '1/**', 'README.md', '**/*.py'],
  vite: {
    resolve: {
      alias: [
        { find: 'vue/server-renderer', replacement: resolvePkg('vue/server-renderer/index.mjs') },
        { find: /^vue$/, replacement: resolvePkg('vue/dist/vue.runtime.esm-bundler.js') },
      ],
    },
  },
  themeConfig: {
    sidebar: createSidebar(),
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Caderno', link: '/' },
      { text: 'Biblioteca', link: '/#biblioteca' },
      { text: 'Trilhas', link: '/#trilhas' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/GustavoMelo1/learning-notes' },
    ],
    outline: {
      level: [2, 3],
      label: 'Nesta página',
    },
    docFooter: {
      prev: 'Anterior',
      next: 'Próximo',
    },
    lastUpdated: {
      text: 'Atualizado em',
    },
  },
})

export default vitePressOptions
