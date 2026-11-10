import { readdirSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createSidebar } from '../.vitepress/sidebar'
import { subjects } from '../.vitepress/theme/subjects'

const files = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(resolve(directory, entry.name)) : [resolve(directory, entry.name)])
const normalize = (url: string) => url.replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '').replace(/\/$/, '')
const links = (items: any[]): string[] => items.flatMap(item => [item.link, ...links(item.items || [])]).filter(Boolean).map(normalize)

describe('Cobertura da navegação', () => {
  it('mantém cada nota acessível no menu do próprio assunto', () => {
    const sidebar = createSidebar()
    for (const subject of subjects) {
      for (const file of files(resolve('..', subject.folder)).filter(file => file.endsWith('.md'))) {
        const url = '/' + relative(resolve('..'), file).replace(/\\/g, '/').replace(/\.md$/, '')
        const prefix = Object.keys(sidebar).filter(prefix => url.startsWith(prefix)).sort((a, b) => b.length - a.length)[0]
        const items = sidebar[prefix] as any[]
        expect(links(items), `Nota fora do menu: ${url}`).toContain(normalize(url))
        expect(links(items), `Índice inacessível em ${url}`).toContain('/indice')
        for (const other of subjects) expect(links(items)).toContain(normalize(other.url))
      }
    }
  })
})
