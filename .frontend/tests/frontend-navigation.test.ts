import { render, screen, within } from '@testing-library/vue'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import LibraryHome from '../.vitepress/theme/components/LibraryHome.vue'
import PracticePaths from '../.vitepress/theme/components/PracticePaths.vue'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))

describe('Acesso ao guia Frontend', () => {
  it('mantém Frontend acessível no início junto com as trilhas', () => {
    render(LibraryHome)
    expect(screen.getByRole('link', { name: /^Frontend/ })).toHaveAttribute('href', '/learning-notes/frontend/')
    expect(screen.getByRole('link', { name: /Ver trilhas de aprendizado/ })).toHaveAttribute('href', '/learning-notes/trilhas/')
    expect(screen.getByRole('link', { name: /Explorar biblioteca/ })).toHaveAttribute('href', '/learning-notes/biblioteca')
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
