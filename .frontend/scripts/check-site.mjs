import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, extname, relative } from 'node:path'
import { JSDOM } from 'jsdom'
import assert from 'node:assert/strict'

const dist = resolve('.vitepress/dist')
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(resolve(directory, entry.name)) : [resolve(directory, entry.name)])
const pages = files(dist).filter(file => file.endsWith('.html'))
// Compare the rendered index with source files, independently of catalog configuration.
const contentFolders = readdirSync('..', { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && !['docs', 'public', 'pratica', 'node_modules', '1'].includes(entry.name))
const sourceNotes = contentFolders.flatMap(entry => files(resolve('..', entry.name))).filter(file => file.endsWith('.md'))
const route = path => path.replace(/\\/g, '/').replace(/\.(html|md)$/, '').replace(/\/index$/, '').replace(/\/$/, '')
const indexDocument = new JSDOM(readFileSync(resolve(dist, 'indice.html'), 'utf8')).window.document
const indexLinks = [...indexDocument.querySelectorAll('.index-note')].map(link => route(decodeURIComponent(link.getAttribute('href')).replace('/learning-notes/', '')))
assert.equal(new Set(indexLinks).size, indexLinks.length, 'Duplicate notes in complete index')
assert.deepEqual([...indexLinks].sort(), sourceNotes.map(file => route(relative(resolve('..'), file))).sort(), 'Some source notes are missing from the catalog/index')
for (const source of sourceNotes) {
  const output = resolve(dist, relative(resolve('..'), source).replace(/\.md$/, '.html'))
  assert.ok(existsSync(output), `Note not published: ${source}`)
}
let checkedLinks = 0
for (const file of pages) {
  const document = new JSDOM(readFileSync(file, 'utf8')).window.document
  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href')
    if (!href.startsWith('/learning-notes/')) continue
    const url = new URL(href, 'https://local.test')
    const local = decodeURIComponent(url.pathname.slice('/learning-notes/'.length))
    let target = resolve(dist, local)
    if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html')
    if (!existsSync(target) && !extname(target)) target += '.html'
    assert.ok(existsSync(target), `${file}: missing ${href}`)
    if (anchor.hasAttribute('download')) assert.ok(existsSync(resolve('../public', local)), `Download must point to a source file in public: ${href}`)
    checkedLinks++
  }
  if (document.querySelector('.lesson-context')) {
    assert.ok(document.querySelector('.lesson-navigation'), `Missing lesson navigation: ${file}`)
    assert.equal(document.querySelectorAll('.prev-next').length, 0, `Duplicate lesson navigation: ${file}`)
  }
  for (const img of document.querySelectorAll('img[src]')) {
    const src = img.getAttribute('src')
    if (!src.startsWith('/learning-notes/')) continue
    assert.ok(existsSync(resolve(dist, decodeURIComponent(src.slice('/learning-notes/'.length)))), `Missing image: ${src}`)
    assert.ok(img.getAttribute('alt')?.trim(), `Missing image description: ${file}`)
  }
}
assert.deepEqual(readFileSync(resolve(dist, 'exercicios/frontend/biblioteca.html')), readFileSync(resolve('../public/exercicios/frontend/biblioteca.html')))
const frontend = new JSDOM(readFileSync(resolve(dist, 'frontend/index.html'), 'utf8')).window.document
assert.ok(frontend.querySelector('a[download]'), 'Missing frontend exercise download')
for (const relative of ['financas/preparar.sql', 'financas/consultas.sql', 'arquivos/pipeline.py', 'api/repositorios.py']) {
  const original = resolve('../public/exercicios', relative)
  const published = resolve(dist, 'exercicios', relative)
  assert.deepEqual(readFileSync(published), readFileSync(original), `Exercise changed during build: ${relative}`)
}
const catalog = new JSDOM(readFileSync(resolve(dist, 'biblioteca.html'), 'utf8')).window.document
assert.equal(catalog.querySelectorAll('.note-row').length, 12)
const practice = new JSDOM(readFileSync(resolve(dist, 'pratica/index.html'), 'utf8')).window.document
assert.equal(practice.querySelectorAll('.path-steps a').length, 13)
const home = new JSDOM(readFileSync(resolve(dist, 'index.html'), 'utf8')).window.document
assert.equal(home.querySelectorAll('.home-guide-steps a').length, 4, 'Frontend steps must be reachable from home')
assert.ok(frontend.querySelector('a[target="_blank"][href="/learning-notes/exercicios/frontend/biblioteca.html"]'), 'Standalone example must open outside the notes router')
for (const guide of ['frontend', 'python/libs/requests', 'python/libs/csv-json', 'sql/aplicado/analise-financeira']) {
  const intro = new JSDOM(readFileSync(resolve(dist, guide, 'index.html'), 'utf8')).window.document
  assert.ok(intro.querySelector('h1'), `Missing subject introduction: ${guide}`)
  assert.ok(intro.querySelector(`a[href^="/learning-notes/${guide}/01-"]`), `Missing example link: ${guide}`)
}
const css = readFileSync(resolve('.vitepress/theme/style.css'), 'utf8')
const luminance = hex => {
  const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722
}
for (const theme of [':root', '.dark']) {
  const block = css.slice(css.indexOf(theme)).split('}')[0]
  const color = name => block.match(new RegExp(`--vp-c-${name}: (#[a-f0-9]{6});`))[1]
  for (const background of ['bg', 'bg-soft', 'bg-alt']) {
    for (const foreground of ['text-1', 'text-2', 'text-3', 'brand-1']) {
      const a = luminance(color(foreground)), b = luminance(color(background))
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05)
      assert.ok(ratio >= 4.5, `${theme}: ${foreground} on ${background} contrast ${ratio.toFixed(2)} < 4.5`)
    }
  }
}
console.log('PASS: text and link color contrast in both themes')
console.log(`PASS: all ${sourceNotes.length} source notes appear in the complete index and build`)
console.log(`PASS: ${pages.length} pages, ${checkedLinks} internal links, local images, 13 lessons and 5 downloadable files`)
