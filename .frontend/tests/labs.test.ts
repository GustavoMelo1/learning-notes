import { render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import JoinLab from '../.vitepress/theme/components/JoinLab.vue'
import QueryLab from '../.vitepress/theme/components/QueryLab.vue'
import GroupLab from '../.vitepress/theme/components/GroupLab.vue'
import DecisionLab from '../.vitepress/theme/components/DecisionLab.vue'
import ListLab from '../.vitepress/theme/components/ListLab.vue'

describe('Laboratórios existentes', () => {
  it('mantém resultados de JOIN corretos e reinicia o desafio ao mudar a junção', async () => {
    const user = userEvent.setup()
    render(JoinLab)
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    let region = screen.getByRole('region', { name: 'Resultado da junção' })
    expect(within(region).getAllByRole('row')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'FULL JOIN' }))
    expect(screen.queryByRole('region', { name: 'Resultado da junção' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    region = screen.getByRole('region', { name: 'Resultado da junção' })
    expect(within(region).getAllByRole('row')).toHaveLength(5)
    expect(within(region).getByText('Financeiro')).toBeVisible()
  })

  it('filtra jogos e permite mudar a projeção de colunas', async () => {
    const user = userEvent.setup()
    render(QueryLab)
    await user.selectOptions(screen.getByLabelText('Gênero'), 'RPG')
    await user.selectOptions(screen.getByLabelText('Colunas do SELECT'), 'titulo')
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    const region = screen.getByRole('region', { name: 'Resultado do SELECT' })
    expect(within(region).getAllByRole('columnheader')).toHaveLength(1)
    expect(within(region).getByText('Elden Ring')).toBeVisible()
    expect(within(region).queryByText('Valorant')).not.toBeInTheDocument()
  })

  it('calcula a média e filtra os grupos com HAVING', async () => {
    const user = userEvent.setup()
    render(GroupLab)
    await user.selectOptions(screen.getByLabelText('Calcular por gênero'), 'AVG')
    await user.selectOptions(screen.getByLabelText('HAVING · filtrar grupos'), 'on')
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    const region = screen.getByRole('region', { name: 'Resultado do agrupamento' })
    expect(within(region).getByText('9.65')).toBeVisible()
    expect(within(region).queryByText('FPS')).not.toBeInTheDocument()
  })

  it('revela decisões pelo teclado e oculta novamente', async () => {
    const user = userEvent.setup()
    render(DecisionLab)
    const button = screen.getByRole('button', { name: 'Mostrar resultado' })
    button.focus()
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('O primeiro if é verdadeiro. Os outros blocos não são executados.')).toBeVisible()
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('resolve um slice negativo e preserva o fim exclusivo', async () => {
    const user = userEvent.setup()
    render(ListLab)
    await user.selectOptions(screen.getByLabelText('Início (incluído)'), '-3')
    await user.selectOptions(screen.getByLabelText('Fim (excluído)'), '-1')
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    expect(screen.getByText("['c', 'd']")).toBeVisible()
    expect(screen.getAllByText('incluído')).toHaveLength(2)
  })
})
