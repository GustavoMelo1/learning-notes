import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'

describe('Exemplo baixável de Frontend', () => {
  it('busca sem acentos, informa estado vazio e restaura as notas', () => {
    const html = readFileSync(resolve('../public/exercicios/frontend/biblioteca.html'), 'utf8')
    const dom = new JSDOM(html, { runScripts: 'dangerously' })
    try {
      const document = dom.window.document
      const input = document.querySelector('input')!
      const visible = () => [...document.querySelectorAll('li')].filter(item => !item.hidden)
      const search = (term: string) => {
        input.value = term
        input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      }
      expect(visible()).toHaveLength(3)
      search('PAGINA')
      expect(visible()).toHaveLength(1)
      expect(visible()[0].textContent).toContain('HTML')
      search('xyz')
      expect(visible()).toHaveLength(0)
      expect(document.querySelector('[role="status"]')!.textContent).toContain('Nenhuma nota')
      search('  ')
      expect(visible()).toHaveLength(3)
    } finally { dom.window.close() }
  })
})
