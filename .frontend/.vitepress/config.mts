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
  srcExclude: ['.frontend/**', '1/**', 'README.md', 'docs/**', 'public/**', '**/*.py'],
  vite: {
    publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
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
      options: { locales: { root: { translations: {
        button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar nas notas' },
        modal: { noResultsText: 'Nenhuma nota encontrada', resetButtonTitle: 'Limpar busca',
          footer: { selectText: 'abrir', navigateText: 'navegar', closeText: 'fechar' } },
      } } } },
    },
    nav: [
      { text: 'Caderno', link: '/' },
      { text: 'Biblioteca', link: '/biblioteca' },
      { text: 'Guias', link: '/pratica/' },
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
    sidebarMenuLabel: 'Assuntos',
    skipToContentLabel: 'Pular para o conteúdo',
    darkModeSwitchLabel: 'Aparência',
    lightModeSwitchTitle: 'Usar tema claro',
    darkModeSwitchTitle: 'Usar tema escuro',
    returnToTopLabel: 'Voltar ao topo',
  },
})

export default vitePressOptions
