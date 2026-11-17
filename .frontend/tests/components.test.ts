import { nextTick } from 'vue'
import { render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import HomePage from '~/components/HomePage.vue'
import TrailPage from '~/components/TrailPage.vue'
import TrailsOverview from '~/components/TrailsOverview.vue'
import LibraryCatalog from '~/components/LibraryCatalog.vue'
import DocFooter from '~/components/DocFooter.vue'
import GroupLab from '~/components/content/GroupLab.vue'
import QueryLab from '~/components/content/QueryLab.vue'
import JoinLab from '~/components/content/JoinLab.vue'
import DecisionLab from '~/components/content/DecisionLab.vue'
import ListLab from '~/components/content/ListLab.vue'
import ExerciseDownload from '~/components/content/ExerciseDownload.vue'
import { progressKey } from '~/lib/progress'
import { trails } from '~/lib/trails'
import type { Note } from '~/lib/notes'

const saveProgress = (completed: string[]) => localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed }))

describe('Início', () => {
  it('tem uma única ação principal: começar a primeira trilha', () => {
    render(HomePage)
    expect(screen.getByRole('link', { name: 'Começar pela trilha de SQL' })).toHaveAttribute('href', '/trilhas/sql')
    expect(document.querySelectorAll('.action.primary')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Explorar biblioteca' })).toHaveAttribute('href', '/biblioteca')
    expect(screen.getByRole('link', { name: /^Frontend/ })).toHaveAttribute('href', '/frontend')
  })
  it('retoma a próxima etapa quando já existe progresso', async () => {
    saveProgress(['sql-select'])
    render(HomePage)
    await nextTick()
    expect(screen.getByRole('link', { name: 'Continuar: Filtrar linhas com WHERE' })).toHaveAttribute('href', '/sql/11-where?trilha=sql')
  })
})

describe('Trilhas', () => {
  it('reúne fundamentos e projetos aplicados em um só lugar', () => {
    render(TrailsOverview)
    expect(screen.getByRole('heading', { name: 'Fundamentos' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Projetos aplicados' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'SQL aplicado: análise financeira' })).toHaveAttribute('href', '/trilhas/financas')
  })
  it('mostra as etapas reais e começa pela primeira', () => {
    render(TrailPage, { props: { trail: trails[0] } })
    expect(screen.getByRole('link', { name: 'Começar trilha' })).toHaveAttribute('href', '/sql/09-select?trilha=sql')
    expect(screen.getByRole('progressbar')).toHaveAttribute('max', '9')
    expect(document.querySelectorAll('.trail-sequence a')).toHaveLength(9)
  })
  it('continua de onde parou e destaca a próxima etapa', async () => {
    saveProgress(['sql-select'])
    render(TrailPage, { props: { trail: trails[0] } })
    await nextTick()
    expect(screen.getByRole('link', { name: 'Continuar estudo' })).toHaveAttribute('href', '/sql/11-where?trilha=sql')
    expect(document.querySelector('.is-next')).toHaveTextContent('Filtrar linhas com WHERE')
  })
  it('continua depois da etapa mais avançada e aponta as que ficaram para trás', async () => {
    saveProgress(['sql-group'])
    render(TrailPage, { props: { trail: trails[0] } })
    await nextTick()
    expect(screen.getByRole('link', { name: 'Continuar estudo' })).toHaveAttribute('href', '/sql/19-having?trilha=sql')
    expect(document.querySelectorAll('.is-gap')).toHaveLength(6)
    expect(screen.getByText(/6 etapas ficaram para trás/)).toBeVisible()
  })
})

describe('Biblioteca', () => {
  const notes: Note[] = [
    { title: 'Variáveis', label: 'Variáveis', url: '/python/code/01-variables', folder: 'python', category: 'Python', description: 'Valores e tipos.', kind: 'Anotação' },
    { title: 'Agrupar despesas', label: 'Agrupar despesas', url: '/sql/aplicado/analise-financeira/02-consultar', folder: 'sql', category: 'SQL', description: 'Usar SQL para analisar gastos.', kind: 'Projeto' },
    ...Array.from({ length: 14 }, (_, i): Note => ({ title: `Consulta ${i + 1}`, label: `Consulta ${i + 1}`, url: `/sql/consulta-${i + 1}`, folder: 'sql', category: 'SQL', description: 'Exemplo de consulta.', kind: 'Anotação' })),
  ]
  it('busca sem acentos e combina assunto com tipo de conteúdo', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog, { props: { notes } })
    await user.type(screen.getByRole('searchbox'), 'variaveis')
    expect(screen.getByRole('link', { name: /Variáveis/ })).toHaveAttribute('href', '/python/code/01-variables')
    expect(screen.getByRole('status')).toHaveTextContent('1 resultado')
    await user.click(screen.getByRole('button', { name: 'SQL' }))
    expect(screen.getByText('Nada encontrado por aqui.')).toBeVisible()
  })
  it('limpa um estado vazio e devolve o foco à busca', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog, { props: { notes } })
    await user.type(screen.getByRole('searchbox'), 'zzz')
    await user.click(screen.getByRole('button', { name: 'Limpar busca e filtros' }))
    expect(screen.getByRole('searchbox')).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent('16 resultados')
  })
  it('filtra projetos e mostra mais resultados levando o foco ao primeiro novo', async () => {
    const user = userEvent.setup()
    render(LibraryCatalog, { props: { notes } })
    await user.click(screen.getByRole('button', { name: 'Mostrar mais (4 restantes)' }))
    expect(document.activeElement).toHaveTextContent('Consulta 11')
    await user.click(screen.getByRole('button', { name: 'Projetos' }))
    expect(screen.getByRole('status')).toHaveTextContent('1 resultado')
  })
})

describe('Labs: palpite antes da resposta', () => {
  it('só oferece a resposta depois de uma tentativa e comemora o acerto', async () => {
    const user = userEvent.setup()
    render(GroupLab)
    expect(screen.queryByRole('button', { name: 'Ver resposta' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Responda antes de conferir')
    const input = screen.getByLabelText('Quantos grupos sobram depois de aplicar WHERE e HAVING?')
    await user.type(input, '2')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Ainda não')
    expect(screen.queryByRole('region', { name: 'Resultado do agrupamento' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver resposta' })).toBeVisible()
    await user.clear(input)
    await user.type(input, '3')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Isso!')
    expect(within(screen.getByRole('region', { name: 'Resultado do agrupamento' })).getAllByRole('row')).toHaveLength(4)
  })
  it('calcula a média e filtra os grupos com HAVING', async () => {
    const user = userEvent.setup()
    render(GroupLab)
    await user.selectOptions(screen.getByLabelText('Calcular por gênero'), 'AVG')
    await user.selectOptions(screen.getByLabelText('HAVING · filtrar grupos'), 'on')
    await user.type(screen.getByRole('spinbutton'), '2')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    const region = screen.getByRole('region', { name: 'Resultado do agrupamento' })
    expect(within(region).getByText('9.65')).toBeVisible()
    expect(within(region).queryByText('FPS')).not.toBeInTheDocument()
  })
  it('filtra jogos e muda a projeção de colunas no SELECT', async () => {
    const user = userEvent.setup()
    render(QueryLab)
    await user.selectOptions(screen.getByLabelText('Gênero'), 'RPG')
    await user.selectOptions(screen.getByLabelText('Colunas do SELECT'), 'titulo')
    await user.type(screen.getByRole('spinbutton'), '0')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    await user.click(screen.getByRole('button', { name: 'Ver resposta' }))
    const region = screen.getByRole('region', { name: 'Resultado do SELECT' })
    expect(within(region).getAllByRole('columnheader')).toHaveLength(1)
    expect(within(region).getByText('Elden Ring')).toBeVisible()
    expect(within(region).queryByText('Valorant')).not.toBeInTheDocument()
  })
  it('recomeça o desafio do JOIN ao trocar a junção e mostra as linhas certas', async () => {
    const user = userEvent.setup()
    render(JoinLab)
    await user.type(screen.getByRole('spinbutton'), '2')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(within(screen.getByRole('region', { name: 'Resultado da junção' })).getAllByRole('row')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'FULL JOIN' }))
    expect(screen.queryByRole('region', { name: 'Resultado da junção' })).not.toBeInTheDocument()
    await user.type(screen.getByRole('spinbutton'), '4')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(within(screen.getByRole('region', { name: 'Resultado da junção' })).getByText('Financeiro')).toBeVisible()
  })
  it('pergunta por múltipla escolha qual caminho o if segue', async () => {
    const user = userEvent.setup()
    render(DecisionLab)
    await user.click(screen.getByRole('button', { name: 'Exame' }))
    expect(screen.getByRole('button', { name: 'Exame' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByRole('status')).toHaveTextContent('Ainda não')
    await user.click(screen.getByRole('button', { name: 'Reprovado' }))
    await user.click(screen.getByRole('button', { name: 'Conferir' }))
    expect(screen.getByText('O primeiro if é verdadeiro. Os outros blocos não são executados.')).toBeVisible()
  })
  it('resolve um slice negativo e preserva o fim exclusivo', async () => {
    const user = userEvent.setup()
    render(ListLab)
    await user.selectOptions(screen.getByLabelText('Início (incluído)'), '-3')
    await user.selectOptions(screen.getByLabelText('Fim (excluído)'), '-1')
    await user.click(screen.getByRole('button', { name: 'Mostrar resultado' }))
    expect(screen.getByText("['c', 'd']")).toBeVisible()
  })
})

describe('Fim de uma etapa', () => {
  it('marca a etapa e vira a página dentro da trilha', async () => {
    const next = { text: 'Filtrar linhas com WHERE', url: '/sql/11-where?trilha=sql' }
    const view = render(DocFooter, { props: { step: trails[0].steps[0], trail: trails[0], completed: [], message: '', next } })
    await userEvent.click(screen.getByRole('button', { name: 'Marcar como concluída' }))
    expect(view.emitted('toggle')).toEqual([['sql-select']])
    expect(screen.getByRole('link', { name: /Filtrar linhas com WHERE/ })).not.toHaveClass('primary')
  })
  it('depois de concluir, a próxima etapa vira a ação principal e desmarcar fica discreto', async () => {
    const next = { text: 'Filtrar linhas com WHERE', url: '/sql/11-where?trilha=sql' }
    const view = render(DocFooter, { props: { step: trails[0].steps[0], trail: trails[0], completed: ['sql-select'], message: 'Etapa marcada como concluída.', next } })
    expect(screen.getByRole('link', { name: /Filtrar linhas com WHERE/ })).toHaveClass('primary')
    expect(screen.getByRole('status')).toHaveClass('visually-hidden')
    await userEvent.click(screen.getByRole('button', { name: 'desmarcar' }))
    expect(view.emitted('toggle')).toEqual([['sql-select']])
  })
  it('mostra problemas de armazenamento em vez de escondê-los', () => {
    render(DocFooter, { props: { step: trails[0].steps[0], trail: trails[0], completed: [], message: 'Não foi possível salvar.' } })
    expect(screen.getByRole('status')).toHaveClass('save-message')
  })
  it('baixa exercícios direto da pasta pública, com a base do site', () => {
    render(ExerciseDownload, { props: { file: 'financas/preparar.sql' }, slots: { default: 'Baixar' } })
    expect(screen.getByRole('link', { name: 'Baixar' })).toHaveAttribute('href', '/learning-notes/exercicios/financas/preparar.sql')
    expect(screen.getByRole('link', { name: 'Baixar' })).toHaveAttribute('download')
  })
})
