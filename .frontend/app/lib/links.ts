/**
 * Resolves a link written in a note to where it lives on the site.
 * Notes link like files (./02-css, ../22-relational-model.md, /sql/09-select) — the site serves
 * clean URLs, and static files (downloads, standalone examples) skip the router.
 */
export function resolveNoteLink(href: string, noteDir: string) {
  if (!href || /^([a-z]+:|#|\/\/)/i.test(href)) return { href, external: /^https?:|^\/\//i.test(href), static: false }
  const [, rest = '', hash = ''] = href.match(/^([^#]*)(#.*)?$/) || []
  const [pathPart, query = ''] = rest.split('?')
  const absolute = pathPart.startsWith('/') ? pathPart : new URL(pathPart || '.', `https://notes.local${noteDir}`).pathname
  if (/^\/exercicios\//.test(absolute) || /\.(html|py|sql|csv|json|txt|zip|svg|png|jpe?g)$/i.test(absolute) && !/\.md$/.test(absolute)) {
    return { href: absolute + (query ? `?${query}` : '') + hash, external: false, static: true }
  }
  const clean = absolute.replace(/\.md$/, '').replace(/\/index$/, '').replace(/\/+$/, '') || '/'
  return { href: clean + (query ? `?${query}` : '') + hash, external: false, static: false }
}

/** Directory of a note for resolving relative links: "sql/18-group-by" → "/sql/", "frontend/index" → "/frontend/". */
export const noteDirectory = (stem: string) => `/${stem.split('/').slice(0, -1).join('/')}${stem.includes('/') ? '/' : ''}`
