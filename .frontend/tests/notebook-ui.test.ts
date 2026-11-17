import { ref, nextTick } from 'vue'
import { render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import LibraryHome from '../.vitepress/theme/components/LibraryHome.vue'
import GroupLab from '../.vitepress/theme/components/GroupLab.vue'
import StudyLayout from '../.vitepress/theme/components/StudyLayout.vue'
import { progressKey } from '../.vitepress/theme/progress'

const data = vi.hoisted(() => ({ current: null as any }))
vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}`, useData: () => data.current }))
vi.mock('vitepress/theme', () => ({ default: { Layout: { template: '<div><slot name="doc-before" /><slot name="doc-after" /></div>' } } }))

describe('Home com uma ação principal', () => {
  it('convida a começar a primeira trilha quando não há progresso', () => {
    render(LibraryHome)
    expect(screen.getByRole('link', { name: 'Começar pela trilha de SQL' })).toHaveAttribute('href', '/learning-notes/trilhas/sql/')
  })
  it('retoma a próxima etapa pendente quando já há progresso', async () => {
    localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: ['sql-select'] }))
    render(LibraryHome)
    await nextTick()
    expect(screen.getByRole('link', { name: /^Continuar: Filtrar linhas com WHERE/ })).toHaveAttribute('href', '/learning-notes/sql/11-where?trilha=sql')
  })
})

describe('Palpite antes do resultado', () => {
  it('corrige um palpite errado e revela o resultado ao acertar', async () => {
    const user = userEvent.setup()
    render(GroupLab)
    const input = screen.getByLabelText('Quantos grupos ficam no resultado?')
    await user.type(input, '2')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Ainda não')
    expect(screen.queryByRole('region', { name: 'Resultado do agrupamento' })).not.toBeInTheDocument()
    await user.clear(input)
    await user.type(input, '3')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Isso!')
    expect(within(screen.getByRole('region', { name: 'Resultado do agrupamento' })).getAllByRole('row')).toHaveLength(4)
  })
})

describe('Contexto de uma nota aberta pela biblioteca', () => {
  it('mostra o assunto no caminho e indica a trilha que usa a nota', () => {
    window.history.replaceState({}, '', '/learning-notes/sql/18-group-by.html')
    data.current = { frontmatter: ref({}), page: ref({ relativePath: 'sql/18-group-by.md', title: 'Group By' }) }
    render(StudyLayout)
    const crumbs = screen.getByRole('navigation', { name: 'Localização' })
    expect(within(crumbs).getByRole('link', { name: 'SQL' })).toBeVisible()
    expect(within(crumbs).getByText('Group By')).toBeVisible()
    expect(screen.getByRole('link', { name: 'seguir pela trilha' })).toHaveAttribute('href', '/learning-notes/sql/18-group-by?trilha=sql')
  })
})
