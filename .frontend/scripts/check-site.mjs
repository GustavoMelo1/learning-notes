// Checks the generated site (.output/public) before it is published. Run after `npm run build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

const out = resolve('.output/public')
const root = resolve('..')
const base = '/learning-notes/'
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)])
const read = path => new JSDOM(readFileSync(join(out, path), 'utf8')).window.document

// How GitHub Pages answers a request: exact file, then x.html, then x/index.html.
function served(urlPath) {
  const local = decodeURIComponent(urlPath.replace(base, '')).replace(/^\/+/, '')
  const candidates = [local, `${local.replace(/\/$/, '')}.html`, join(local, 'index.html')]
  return candidates.map(path => join(out, path)).find(path => existsSync(path) && statSync(path).isFile())
}

// 1. Every note is published, under its old address too, and listed in the complete index.
const subjects = ['sql', 'python', 'frontend', 'data-engineering', 'bi', 'mongodb']
const sourceNotes = subjects.flatMap(folder => files(join(root, folder))).filter(file => file.endsWith('.md'))
const route = file => '/' + relative(root, file).replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '')
const index = read('indice.html')
const indexed = [...index.querySelectorAll('.index-note')].map(link => link.getAttribute('href').replace(base.slice(0, -1), ''))
assert.equal(new Set(indexed).size, indexed.length, 'Duplicate notes in the complete index')
assert.deepEqual([...indexed].sort(), sourceNotes.map(file => route(file).toLowerCase()).sort(), 'Some notes are missing from the complete index')
for (const file of sourceNotes) {
  const url = route(file)
  assert.ok(served(`${base}${url.slice(1).toLowerCase()}`), `Note not published: ${url}`)
  const old = file.endsWith('index.md') ? `${base}${url.slice(1)}/` : `${base}${url.slice(1)}.html`
  assert.ok(served(old), `Old address no longer works: ${old}`)
  const document = read(relative(out, served(`${base}${url.slice(1).toLowerCase()}`)))
  assert.equal(document.querySelectorAll('h1').length, 1, `Expected one h1: ${url}`)
}
for (const old of ['', 'biblioteca.html', 'indice.html', 'sobre.html', 'trilhas/', 'trilhas/sql/', 'trilhas/python/', 'pratica/', 'pratica/financas/01-preparar.html', '404.html']) {
  assert.ok(served(base + old), `Old address no longer works: ${base}${old}`)
}

// 2. Internal links, images and downloads.
const pages = files(out).filter(file => file.endsWith('.html'))
let checkedLinks = 0
for (const file of pages) {
  const document = new JSDOM(readFileSync(file, 'utf8')).window.document
  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href')
    if (!href.startsWith(base)) continue
    const path = new URL(href, 'https://local.test').pathname
    assert.ok(served(path), `${relative(out, file)}: broken link ${href}`)
    if (anchor.hasAttribute('download')) assert.ok(existsSync(join(root, 'public', path.replace(base, ''))), `Download must come from /public: ${href}`)
    checkedLinks++
  }
  for (const img of document.querySelectorAll('img[src]')) {
    const src = img.getAttribute('src')
    if (src.startsWith(base)) assert.ok(served(src), `Missing image: ${src}`)
    assert.ok(img.getAttribute('alt')?.trim(), `Missing image description in ${relative(out, file)}`)
  }
}
for (const exercise of ['financas/preparar.sql', 'financas/consultas.sql', 'arquivos/pipeline.py', 'api/repositorios.py', 'frontend/biblioteca.html']) {
  assert.deepEqual(readFileSync(join(out, 'exercicios', exercise)), readFileSync(join(root, 'public/exercicios', exercise)), `Exercise changed during build: ${exercise}`)
}
const frontend = read('frontend.html')
assert.ok(frontend.querySelector(`a[target="_blank"][href="${base}exercicios/frontend/biblioteca.html"]`), 'Standalone example must open outside the router')
assert.ok(frontend.querySelector('a[download]'), 'Missing frontend example download')

// 3. Pages that guide the reader.
const home = read('index.html')
assert.equal(home.querySelectorAll('.action.primary').length, 1, 'Home must have exactly one primary action')
assert.ok(home.querySelector(`a[href="${base}frontend"]`), 'Frontend must stay reachable from home')
for (const [id, steps] of [['sql', 9], ['python', 10], ['frontend', 4], ['financas', 3], ['arquivos', 3], ['api', 3]]) {
  const trail = read(`trilhas/${id}.html`)
  const links = [...trail.querySelectorAll('.trail-sequence a')]
  assert.equal(links.length, steps, `Trail ${id} steps`)
  for (const link of links) assert.equal(new URL(link.getAttribute('href'), 'https://local.test').searchParams.get('trilha'), id)
}
const overview = read('trilhas.html')
assert.equal(overview.querySelectorAll('.trail-entry').length, 6, 'Trails page lists every trail')
const lesson = read('sql/18-group-by.html')
assert.ok(lesson.querySelector('.trail-note'), 'A trail note shows its trail even without ?trilha')
assert.ok(lesson.querySelector('.doc-sidebar'), 'Notes keep their subject sidebar')
assert.ok(lesson.querySelector('.learning-lab'), 'Labs render inside notes')
assert.ok(read('sql/09-select.html').querySelector('button.copy'), 'Code blocks keep a copy button')

// 4. Search index: every note, no redirect stubs.
const search = JSON.parse(readFileSync(join(out, 'search.json'), 'utf8'))
assert.ok(search.length > 100, 'Search index looks empty')
assert.ok(!search.some(section => section.id.startsWith('/pratica')), 'Redirect stubs must stay out of search')
assert.ok(!search.some(section => /--shiki|\.shiki\b/.test(section.content)), 'Search snippets must not contain highlighter CSS')

// 5. Theme chosen before first paint, with the key the previous site used.
const themeScript = [...home.querySelectorAll('script:not([src])')].find(script => script.textContent.includes('vitepress-theme-appearance'))?.textContent
assert.ok(themeScript, 'Missing theme preference script')
for (const [preference, systemDark, expectedDark] of [[null, true, true], [null, false, false], ['light', true, false], ['dark', false, true]]) {
  const simulation = new JSDOM('<!doctype html><html></html>', { url: 'https://local.test', runScripts: 'outside-only' })
  simulation.window.matchMedia = () => ({ matches: systemDark })
  if (preference) simulation.window.localStorage.setItem('vitepress-theme-appearance', preference)
  simulation.window.eval(themeScript)
  assert.equal(simulation.window.document.documentElement.classList.contains('dark'), expectedDark)
  simulation.window.close()
}

// 6. Text contrast (WCAG AA, 4.5:1) in both themes.
const css = readFileSync('app/assets/css/tokens.css', 'utf8')
const luminance = hex => hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255)
  .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
  .reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0)
for (const theme of [':root {', ':root.dark {']) {
  const block = css.slice(css.indexOf(theme)).split('}')[0]
  const color = name => block.match(new RegExp(`--${name}: (#[a-f0-9]{6});`))[1]
  for (const background of ['paper', 'paper-alt', 'paper-soft', 'paper-raised', 'marker-soft']) {
    for (const foreground of ['ink', 'ink-2', 'ink-3', 'pen', 'red']) {
      const a = luminance(color(foreground)), b = luminance(color(background))
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05)
      assert.ok(ratio >= 4.5, `${theme} --${foreground} on --${background}: contrast ${ratio.toFixed(2)} < 4.5`)
    }
  }
  const onPen = (luminance(color('on-pen')) + .05, [luminance(color('on-pen')), luminance(color('pen'))])
  const [x, y] = onPen
  assert.ok((Math.max(x, y) + .05) / (Math.min(x, y) + .05) >= 4.5, `${theme} button text contrast`)
}

console.log(`PASS: all ${sourceNotes.length} notes published, indexed and reachable at their old addresses`)
console.log(`PASS: ${pages.length} pages, ${checkedLinks} internal links, images and 5 downloadable files`)
console.log('PASS: trails, labs, copy buttons, search index and theme preference')
console.log('PASS: text and button contrast in both themes')
