// Captura screenshots do Learning Notes para revisão visual.
//
// Pré-requisitos (uma vez, fora do projeto, para não poluir .frontend/package.json):
//   npm i --prefix "$TEMP/ln-shots" playwright-core
// Suba o site:  cd .frontend && npm.cmd run docs:dev   (porta 5173)
// Rode:         NODE_PATH="$TEMP/ln-shots/node_modules" node .claude/scripts/screenshots.mjs [pastaSaida]
//
// Usa o Microsoft Edge instalado (channel "msedge"); troque para "chrome" se preferir.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const require = createRequire(join(process.env.NODE_PATH || '.', 'x.js'))
const { chromium } = require('playwright-core')

const base = process.env.BASE_URL || 'http://localhost:5173/learning-notes'
const out = process.argv[2] || 'screenshots'
mkdirSync(out, { recursive: true })

const pages = {
  home: '/',
  biblioteca: '/biblioteca',
  trilhas: '/trilhas/',
  'trilha-sql': '/trilhas/sql/',
  'nota-group-by': '/sql/18-group-by',
}
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } }
const themes = ['light', 'dark']

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' })
for (const theme of themes) {
  for (const [vpName, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport, colorScheme: theme, deviceScaleFactor: 1 })
    await context.addInitScript(t => localStorage.setItem('vitepress-theme-appearance', t), theme)
    const page = await context.newPage()
    for (const [name, path] of Object.entries(pages)) {
      await page.goto(base + path, { waitUntil: 'networkidle' })
      // Scroll through the page so scroll-triggered animations (v-reveal, grifo) play before capture.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(1200)
      const file = join(out, `${name}-${vpName}-${theme}.png`)
      await page.screenshot({ path: file, fullPage: true })
      console.log(file)
    }
    await context.close()
  }
}
await browser.close()
