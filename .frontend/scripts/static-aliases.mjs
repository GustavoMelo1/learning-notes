// After `nuxt generate`: make every old VitePress address keep working on GitHub Pages.
// Pages are written as `x.html` (served at /x and /x.html). When a folder `x/` also exists,
// GitHub Pages answers /x/ with x/index.html, so copy the page there too (/frontend/, /trilhas/sql/ ...).
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const out = new URL('../.output/public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
let aliases = 0
function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry)
    if (statSync(file).isDirectory()) { walk(file); continue }
    if (!entry.endsWith('.html') || ['index.html', '200.html', '404.html'].includes(entry)) continue
    const folder = file.slice(0, -'.html'.length)
    if (existsSync(folder) && statSync(folder).isDirectory() && !existsSync(join(folder, 'index.html'))) {
      copyFileSync(file, join(folder, 'index.html'))
      aliases++
    }
  }
}
walk(out)

// Nuxt Content lower-cases routes (data-engineering/GCP → gcp); GitHub Pages is case-sensitive,
// so publish the page at its original spelling as well.
const root = join(out, '../../..')
const notes = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? notes(join(dir, entry.name)) : [join(dir, entry.name)])
for (const folder of ['sql', 'python', 'frontend', 'data-engineering', 'bi', 'mongodb']) {
  for (const file of notes(join(root, folder)).filter(name => name.endsWith('.md') && !name.endsWith('index.md'))) {
    const original = relative(root, file).replace(/\\/g, '/').replace(/\.md$/, '.html')
    const lower = original.toLowerCase()
    if (original === lower || existsSync(join(out, original)) || !existsSync(join(out, lower))) continue
    mkdirSync(dirname(join(out, original)), { recursive: true })
    copyFileSync(join(out, lower), join(out, original))
    aliases++
  }
}
writeFileSync(join(out, '.nojekyll'), '') // folders starting with "_" (/_nuxt, _payload.json) must be served as-is
console.log(`static aliases: ${aliases} pages`)
