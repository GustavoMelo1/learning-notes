import { ref, nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, afterEach } from 'vitest'
import StudyLayout from '../.vitepress/theme/components/StudyLayout.vue'
import LearningTrail from '../.vitepress/theme/components/LearningTrail.vue'
import { syncTrailLocation } from '../.vitepress/theme/trail-context'
import { progressKey } from '../.vitepress/theme/progress'

const data = vi.hoisted(() => ({ current: null as any }))
vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}`, useData: () => data.current }))
vi.mock('vitepress/theme', () => ({ default: { Layout: { template: '<div><slot name="doc-before" /><slot name="doc-after" /></div>' } } }))
function openLesson(href = '/learning-notes/sql/09-select.html?trilha=sql') {
  window.history.replaceState({}, '', href)
  data.current = { frontmatter: ref({}), page: ref({ relativePath: 'sql/09-select.md' }) }
  return render(StudyLayout)
}
afterEach(() => { window.history.replaceState({}, '', '/'); syncTrailLocation('/') })

describe('Aprender pela trilha', () => {
  it('permite começar sem progresso e mostra as etapas reais', () => {
    render(LearningTrail, { props: { id: 'sql' } })
    expect(screen.getByRole('link', { name: /Começar trilha/ })).toHaveAttribute('href', '/learning-notes/sql/09-select?trilha=sql')
    expect(screen.getByRole('heading', { name: 'Seu caminho de estudo' })).toBeVisible()
    expect(screen.getByRole('progressbar')).toHaveAttribute('max', '9')
  })
  it('marca pelo teclado, navega à próxima etapa e restaura a continuação', async () => {
    const user = userEvent.setup()
    const view = openLesson()
    await nextTick()
    expect(screen.getByRole('navigation', { name: 'Trilha atual' })).toHaveTextContent('Etapa 1 de 9')
    const mark = screen.getByRole('button', { name: 'Marcar como concluída' })
    mark.focus()
    await user.keyboard(' ')
    expect(mark).toHaveAttribute('aria-pressed', 'true')
    expect(JSON.parse(localStorage.getItem(progressKey)!)).toEqual({ version: 2, completed: ['sql-select'] })
    expect(screen.getByRole('link', { name: /Próxima etapa/ })).toHaveAttribute('href', '/learning-notes/sql/11-where?trilha=sql')
    view.unmount()
    render(LearningTrail, { props: { id: 'sql' } })
    await nextTick()
    expect(screen.getByRole('link', { name: /Continuar estudo/ })).toHaveAttribute('href', '/learning-notes/sql/11-where?trilha=sql')
  })
  it('preserva a leitura normal e remove contexto ao voltar à biblioteca', async () => {
    openLesson()
    await nextTick()
    syncTrailLocation('/learning-notes/sql/09-select.html')
    await nextTick()
    expect(screen.queryByRole('button', { name: /Marcar como concluída/ })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Biblioteca' })).toBeVisible()
  })
  it('não mostra contexto de uma trilha errada ou de um acesso direto', async () => {
    const view = openLesson('/learning-notes/sql/09-select.html?trilha=python')
    await nextTick()
    expect(screen.queryByRole('navigation', { name: 'Trilha atual' })).not.toBeInTheDocument()
    view.unmount()
    openLesson('/learning-notes/sql/09-select.html')
    await nextTick()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
