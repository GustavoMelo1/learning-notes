// Serves .output/public the way GitHub Pages does, under /learning-notes/.
// /x → x.html → x/index.html → 404.html. Usage: node scripts/serve.mjs [port]
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = new URL('../.output/public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const base = '/learning-notes/'
const port = Number(process.argv[2] || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.py': 'text/plain; charset=utf-8', '.sql': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.wasm': 'application/wasm' }
const isFile = path => stat(path).then(info => info.isFile(), () => false)

createServer(async (request, response) => {
  const url = new URL(request.url, 'http://local')
  if (!url.pathname.startsWith(base)) { response.writeHead(302, { location: base }); return response.end() }
  const relative = normalize(decodeURIComponent(url.pathname.slice(base.length))).replace(/^([/\\])+/, '')
  const candidates = [relative, `${relative.replace(/[/\\]$/, '')}.html`, join(relative, 'index.html')].map(path => join(root, path))
  for (const file of candidates) {
    if (await isFile(file)) {
      response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' })
      return response.end(await readFile(file))
    }
  }
  response.writeHead(404, { 'content-type': types['.html'] })
  response.end(await readFile(join(root, '404.html')))
}).listen(port, () => console.log(`http://localhost:${port}${base}`))
