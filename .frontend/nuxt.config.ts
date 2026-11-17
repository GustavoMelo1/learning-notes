import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { relative } from 'node:path'

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))
const baseURL = process.env.NUXT_APP_BASE_URL || '/learning-notes/'

// Applies the saved (or system) theme before the first paint, so there is no light flash in dark mode.
// Keeps the key used by the previous VitePress site so readers keep their choice.
const themeScript = `(()=>{try{var s=localStorage.getItem('vitepress-theme-appearance')||'auto';var d=s==='dark'||(s==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`

// Old /pratica/<guia>/<aula> addresses still have small Markdown pages pointing to the new place.
// Nothing links to them anymore, so list them for prerendering explicitly.
const legacyLessons = readdirSync(new URL('../pratica', import.meta.url), { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .flatMap(dir => readdirSync(new URL(`../pratica/${dir.name}`, import.meta.url)).filter(file => file.endsWith('.md')).map(file => `/pratica/${dir.name}/${file.slice(0, -3)}`))

function lastCommitDate(file: string) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', relative(repositoryRoot, file)], { cwd: repositoryRoot, encoding: 'utf8' }).trim() || undefined
  } catch { return undefined }
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/content'],
  ssr: true,
  devtools: { enabled: false },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      titleTemplate: title => (title && title !== 'Learning Notes' ? `${title} · Learning Notes` : 'Learning Notes'),
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Um caderno aberto de SQL, Python e dados: anotações, exemplos e trilhas de estudo.' },
        { name: 'theme-color', content: '#fbf8f1', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#1a1816', media: '(prefers-color-scheme: dark)' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }],
      script: [{ innerHTML: themeScript, tagPosition: 'head' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    '@fontsource-variable/fraunces/full.css',
    '@fontsource-variable/source-serif-4/index.css',
    '@fontsource-variable/jetbrains-mono/index.css',
    '@fontsource/caveat/500.css',
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
    '~/assets/css/prose.css',
  ],

  dir: { public: '../public' },

  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
          langs: ['sql', 'python', 'bash', 'powershell', 'js', 'ts', 'json', 'html', 'css', 'vue', 'md', 'ini'],
        },
      },
    },
  },

  hooks: {
    'content:file:afterParse'(ctx) {
      const file = String(ctx.file.path || '')
      if (file) (ctx.content as Record<string, unknown>).updatedAt = lastCommitDate(file)
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: true,
      // Windows can fail renaming Nitro's cache files when routes render in parallel (EPERM).
      concurrency: process.platform === 'win32' ? 1 : 8,
      routes: ['/', '/search.json', '/404.html', '/pratica', ...legacyLessons],
      // Each page is written as page.html, which GitHub Pages also serves at the clean URL
      // and keeps every old VitePress ".html" link working.
      autoSubfolderIndex: false,
    },
    publicAssets: [{ dir: fileURLToPath(new URL('../frontend/imagens', import.meta.url)), baseURL: '/frontend/imagens' }],
  },

  experimental: { payloadExtraction: true },
  typescript: { strict: true },
})
