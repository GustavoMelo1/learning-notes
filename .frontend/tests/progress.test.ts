import { defineComponent, nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { useProgress } from '../.vitepress/theme/progress'
import PracticePaths from '../.vitepress/theme/components/PracticePaths.vue'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))
const key = 'learning-notes:practice:v1'
const url = '/pratica/financas/01-preparar'
const Lesson = defineComponent({
  setup() { return { ...useProgress(), url } },
  template: '<button :aria-pressed="completed.includes(url)" @click="toggle(url)">Marcar etapa</button><p role="status">{{ message }}</p>',
})

describe('Progresso dos percursos', () => {
  it('marca pelo teclado e restaura a etapa depois de reabrir', async () => {
    const user = userEvent.setup()
    const { unmount } = render(Lesson)
    await user.tab()
    await user.keyboard(' ')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual([url])
    unmount()
    render(PracticePaths)
    expect(screen.getByText('1 de 3 estudadas')).toBeVisible()
    expect(screen.getByRole('link', { name: /Entender a tabela/ })).toHaveTextContent('Estudada')
  })

  it('permite desmarcar uma etapa sem afetar as outras', async () => {
    localStorage.setItem(key, JSON.stringify([url, '/pratica/api/01-resposta']))
    const user = userEvent.setup()
    render(Lesson)
    await user.click(screen.getByRole('button'))
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(['/pratica/api/01-resposta'])
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('informa falha ao salvar e não mostra uma conclusão que não foi persistida', async () => {
    const user = userEvent.setup()
    render(Lesson)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota exceeded') })
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível salvar')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('continua exibindo os percursos com armazenamento bloqueado', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('SecurityError') })
    render(PracticePaths)
    await nextTick()
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível ler')
    expect(screen.getByRole('link', { name: /Entender a resposta/ })).toBeVisible()
  })

  it('ignora entradas desconhecidas e duplicadas no progresso salvo', async () => {
    localStorage.setItem(key, JSON.stringify([url, url, '/inexistente', null, 42]))
    render(PracticePaths)
    await nextTick()
    expect(screen.getByText('1 de 3 estudadas')).toBeVisible()
    expect(screen.getAllByText('0 de 3 estudadas')).toHaveLength(2)
  })

  it('aceita recuperar um registro corrompido ao marcar uma etapa', async () => {
    localStorage.setItem(key, '{invalido')
    const user = userEvent.setup()
    render(Lesson)
    await nextTick()
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível ler')
    await user.click(screen.getByRole('button'))
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual([url])
  })
})
