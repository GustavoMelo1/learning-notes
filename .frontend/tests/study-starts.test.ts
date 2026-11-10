import { render, screen, within } from '@testing-library/vue'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import StudyStarts from '../.vitepress/theme/components/StudyStarts.vue'
import { paths } from '../.vitepress/theme/paths'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))
const key = 'learning-notes:practice:v1'
describe('Entrada de estudo na biblioteca', () => {
  it('leva um novo leitor à introdução do assunto', async () => {
    render(StudyStarts)
    await nextTick()
    expect(screen.getByRole('link', { name: /Frontend:.*Começar/ })).toHaveAttribute('href', '/learning-notes/frontend/')
  })
  it('retoma a primeira etapa pendente, mesmo com progresso fora de ordem', async () => {
    localStorage.setItem(key, JSON.stringify(['/frontend/01-html', '/frontend/03-javascript']))
    render(StudyStarts)
    await nextTick()
    const link = screen.getByRole('link', { name: /Frontend:.*Continuar/ })
    expect(link).toHaveAttribute('href', '/learning-notes/frontend/02-css')
    expect(within(link).getByText('2 / 4 etapas')).toBeVisible()
  })
  it('oferece revisão quando todas as etapas foram estudadas', async () => {
    localStorage.setItem(key, JSON.stringify(paths[0].steps.map(step => step.url)))
    render(StudyStarts)
    await nextTick()
    expect(screen.getByRole('link', { name: /Frontend:.*Revisar/ })).toHaveAttribute('href', '/learning-notes/frontend/')
  })
})
