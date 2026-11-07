import { render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import LibraryCatalog from '../.vitepress/theme/components/LibraryCatalog.vue'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))
vi.mock('../.vitepress/theme/notes.data', () => ({ data: [
  { title: 'Variáveis', category: 'Python', kind: 'Anotação', description: 'Valores e tipos.', url: '/python/variaveis.html' },
  { title: 'Agrupar despesas', category: 'SQL', kind: 'Prática', description: 'Usar SQL para analisar gastos.', url: '/sql/aplicado/analise-financeira/02-consultar.html' },
  ...Array.from({ length: 14 }, (_, index) => ({ title: `Consulta ${index + 1}`, category: 'SQL', kind: 'Anotação', description: 'Exemplo de consulta.', url: `/sql/consulta-${index + 1}.html` })),
] }))

describe('Biblioteca', () => {
  it('busca sem acentos e combina assunto com tipo de conteúdo', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog)
    await user.type(screen.getByRole('searchbox'), 'variaveis')
    expect(screen.getByRole('link', { name: /Variáveis/ })).toHaveAttribute('href', '/learning-notes/python/variaveis.html')
    expect(screen.getByRole('status')).toHaveTextContent('1 resultado')
    await user.selectOptions(screen.getByLabelText('Assunto'), 'SQL')
    expect(screen.getByText('Nada encontrado por aqui.')).toBeVisible()
  })

  it('permite limpar um estado vazio pelo teclado e devolve foco à busca', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog)
    await user.type(screen.getByRole('searchbox'), 'inexistente')
    screen.getByRole('button', { name: 'Limpar busca e filtros' }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByRole('searchbox')).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent('16 resultados')
  })

  it('mostra mais resultados e move o foco para a primeira nota nova', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog)
    const list = screen.getAllByRole('list')[0]
    expect(within(list).getAllByRole('link')).toHaveLength(12)
    screen.getByRole('button', { name: /Mostrar mais/ }).focus()
    await user.keyboard('{Enter}')
    expect(within(list).getAllByRole('link')).toHaveLength(16)
    expect(screen.getByRole('link', { name: /Consulta 11 / })).toHaveFocus()
    expect(screen.queryByRole('button', { name: /Mostrar mais/ })).not.toBeInTheDocument()
  })

  it('filtra exercícios de projeto sem perder o acesso aos percursos', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog)
    await user.click(screen.getByRole('button', { name: 'Prática' }))
    expect(screen.getByRole('button', { name: 'Prática' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('1 resultado')
    expect(screen.getByRole('link', { name: /Agrupar despesas/ })).toBeVisible()
    expect(screen.getByRole('link', { name: /Escolher um assunto/ })).toHaveAttribute('href', '/learning-notes/pratica/')
  })

  it('reinicia a paginação ao alterar os filtros', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog)
    await user.click(screen.getByRole('button', { name: /Mostrar mais/ }))
    await user.selectOptions(screen.getByLabelText('Assunto'), 'SQL')
    expect(within(screen.getAllByRole('list')[0]).getAllByRole('link')).toHaveLength(12)
    expect(screen.getByRole('button', { name: /3 restantes/ })).toBeVisible()
  })
})
