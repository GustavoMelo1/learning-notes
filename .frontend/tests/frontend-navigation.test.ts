import { render, screen, within } from '@testing-library/vue'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import LibraryHome from '../.vitepress/theme/components/LibraryHome.vue'
import PracticePaths from '../.vitepress/theme/components/PracticePaths.vue'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))

describe('Acesso ao guia Frontend', () => {
  it('expõe as quatro etapas diretamente no início', () => {
    render(LibraryHome)
    const steps = within(screen.getByRole('list', { name: 'Etapas de Frontend' }))
    expect(steps.getAllByRole('link')).toHaveLength(4)
    expect(steps.getByRole('link', { name: /HTML/ })).toHaveAttribute('href', '/learning-notes/frontend/01-html')
    expect(steps.getByRole('link', { name: /JavaScript/ })).toHaveAttribute('href', '/learning-notes/frontend/03-javascript')
  })
  it('inclui Frontend nos guias e restaura o progresso da aula', async () => {
    localStorage.setItem('learning-notes:practice:v1', JSON.stringify(['/frontend/01-html']))
    render(PracticePaths)
    await nextTick()
    const guide = within(screen.getByRole('region', { name: 'Frontend: do HTML ao site' }))
    expect(guide.getByRole('link', { name: /HTML/ })).toHaveTextContent('Estudada')
    expect(guide.getByText('1 de 4 estudadas')).toBeVisible()
    expect(guide.getByRole('link', { name: /Começar pela introdução/ })).toHaveAttribute('href', '/learning-notes/frontend/')
  })
})
