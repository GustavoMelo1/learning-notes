import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { subjects } from '~/lib/subjects'
import { canonicalPath, resolveTrailContext, resumePoint, trailForIntro, trailProgress, trails } from '~/lib/trails'
import { neighbours, sidebarFor, toNotes } from '~/lib/notes'
import { noteDirectory, resolveNoteLink } from '~/lib/links'

const root = resolve('..')
const files = (directory: string): string[] => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? files(resolve(directory, entry.name)) : [resolve(directory, entry.name)])
const toUrl = (file: string) => canonicalPath('/' + relative(root, file).replace(/\\/g, '/'))
const sourceNotes = subjects.flatMap(subject => files(resolve(root, subject.folder)).filter(file => file.endsWith('.md')))
const docs = sourceNotes.map(file => ({ path: toUrl(file), title: readFileSync(file, 'utf8').match(/^#\s+(.+)$/m)?.[1] || '' }))
const notes = toNotes(docs)

describe('Trilhas', () => {
  it('usam ids únicos e apontam para notas que existem', () => {
    const ids = trails.flatMap(trail => trail.steps.map(step => step.id))
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(trails.map(trail => trail.id)).size).toBe(trails.length)
    for (const trail of trails) {
      for (const url of [...trail.steps.map(step => step.url), ...(trail.intro ? [trail.intro] : [])]) {
        const file = resolve(root, `.${url}.md`)
        expect(existsSync(file) || existsSync(resolve(root, `.${url}/index.md`)), `${trail.id}: ${url}`).toBe(true)
      }
    }
  })
  it('mantêm os ids de progresso dos antigos guias e das trilhas de fundamentos', () => {
    expect(trails.find(trail => trail.id === 'sql')!.steps[0].id).toBe('sql-select')
    expect(trails.find(trail => trail.id === 'api')!.steps[0].id).toBe('/python/libs/requests/01-resposta')
    expect(trails.find(trail => trail.id === 'frontend')!.steps[0].id).toBe('/frontend/01-html')
  })
  it('mostram o contexto da trilha mesmo sem ?trilha, e a escolha explícita vence', () => {
    expect(resolveTrailContext('/sql/18-group-by.html')).toMatchObject({ index: 6, step: { id: 'sql-group' } })
    expect(resolveTrailContext('/sql/18-group-by', 'sql')?.explicit).toBe(true)
    expect(resolveTrailContext('/sql/02-create-table')).toBeNull()
    expect(trailForIntro('/sql/aplicado/analise-financeira/')?.id).toBe('financas')
  })
  it('retomam depois da etapa mais avançada, sem puxar de volta para as puladas', () => {
    expect(resumePoint([])).toMatchObject({ started: false, trail: { id: 'sql' } })
    expect(resumePoint(['python-environment'])).toMatchObject({ started: true, trail: { id: 'python' }, step: { id: 'python-types' }, index: 1 })
    expect(resumePoint(['sql-group'])).toMatchObject({ step: { id: 'sql-having' }, index: 7 })
    const sql = trails[0]
    expect(trailProgress(sql, ['sql-group']).gaps.map(step => step.id)).toEqual(['sql-select', 'sql-where', 'sql-logical', 'sql-null', 'sql-order', 'sql-distinct'])
    // Nothing pending after the furthest step: fall back to the first gap.
    expect(trailProgress(sql, ['sql-join']).next?.id).toBe('sql-select')
  })
})

describe('Endereços e links', () => {
  it('normalizam .html, .md, index e barra final', () => {
    expect(canonicalPath('/sql/09-select.html')).toBe('/sql/09-select')
    expect(canonicalPath('/frontend/')).toBe('/frontend')
    expect(canonicalPath('/frontend/index')).toBe('/frontend')
    expect(canonicalPath('/')).toBe('/')
  })
  it('resolvem links relativos de uma nota como arquivos', () => {
    expect(noteDirectory('frontend/index')).toBe('/frontend/')
    expect(noteDirectory('sobre')).toBe('/')
    expect(resolveNoteLink('./02-css', '/frontend/').href).toBe('/frontend/02-css')
    expect(resolveNoteLink('22-relational-model.md', '/sql/').href).toBe('/sql/22-relational-model')
    expect(resolveNoteLink('./index#ver-o-resultado', '/frontend/').href).toBe('/frontend#ver-o-resultado')
    expect(resolveNoteLink('/trilhas/', '/').href).toBe('/trilhas')
    expect(resolveNoteLink('/exercicios/frontend/biblioteca.html', '/frontend/')).toMatchObject({ static: true, href: '/exercicios/frontend/biblioteca.html' })
    expect(resolveNoteLink('https://example.com', '/')).toMatchObject({ external: true })
  })
})

describe('Biblioteca e navegação', () => {
  it('lista toda nota de cada assunto, em ordem de leitura', () => {
    expect(notes).toHaveLength(sourceNotes.length)
    expect(notes[0].folder).toBe('sql')
    const sql = notes.filter(note => note.folder === 'sql').map(note => note.url)
    expect(sql.indexOf('/sql/09-select')).toBeLessThan(sql.indexOf('/sql/10-order-by'))
    expect(notes.find(note => note.url === '/sql/18-group-by')).toMatchObject({ label: 'GROUP BY', kind: 'Anotação' })
    expect(notes.find(note => note.url === '/sql/aplicado/analise-financeira/02-consultar')?.kind).toBe('Projeto')
  })
  it('mantém cada nota acessível no menu do próprio assunto', () => {
    for (const subject of subjects) {
      const urls = sidebarFor(subject.folder, notes).flatMap(group => group.items.map(item => item.url))
      for (const note of notes.filter(item => item.folder === subject.folder)) expect(urls, `Nota fora do menu: ${note.url}`).toContain(note.url)
    }
  })
  it('vira a página na ordem do menu quando a nota não está em uma trilha', () => {
    const groups = sidebarFor('sql', notes)
    expect(neighbours('/sql/03-insert-into', groups)).toMatchObject({ previous: { url: '/sql/02-create-table' }, next: { url: '/sql/04-alter-table' } })
  })
})
