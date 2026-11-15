import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { trails, trailProgress, resolveTrailContext, trailStepUrl } from '../.vitepress/theme/trails'

describe('Modelo das trilhas', () => {
  it('usa identificadores únicos e somente conteúdos Markdown existentes', () => {
    expect(new Set(trails.map(trail => trail.id)).size).toBe(trails.length)
    const ids = trails.flatMap(trail => trail.steps.map(step => step.id))
    expect(new Set(ids).size).toBe(ids.length)
    for (const trail of trails) {
      expect(trail.steps.length).toBeGreaterThan(0)
      for (const step of trail.steps) {
        expect(existsSync(resolve('..', step.url.slice(1) + '.md')), step.url).toBe(true)
        expect(new URL(trailStepUrl(trail, step), 'https://local.test').searchParams.get('trilha')).toBe(trail.id)
      }
    }
  })
  it('calcula progresso sem contar duplicatas e recomenda a primeira pendência', () => {
    const trail = trails[0]
    expect(trailProgress(trail, []).next?.id).toBe(trail.steps[0].id)
    expect(trailProgress(trail, [trail.steps[0].id, trail.steps[0].id, trail.steps[2].id, 'unknown'])).toMatchObject({ count: 2, total: 9, next: trail.steps[1] })
    expect(trailProgress(trail, trail.steps.map(step => step.id))).toMatchObject({ count: 9, percent: 100, next: undefined })
  })
  it('ativa contexto somente quando a trilha e o conteúdo correspondem', () => {
    expect(resolveTrailContext('sql/09-select.md', 'sql')?.index).toBe(0)
    expect(resolveTrailContext('sql/09-select.md', null)).toBeNull()
    expect(resolveTrailContext('sql/09-select.md', 'python')).toBeNull()
    expect(resolveTrailContext('sql/09-select.md', '<script>')).toBeNull()
  })
})
