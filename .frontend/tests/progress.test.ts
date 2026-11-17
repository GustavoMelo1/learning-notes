import { defineComponent, nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { legacyProgressKey, progressKey, useProgress } from '~/lib/progress'

// A minimal lesson: one button that marks a step, plus the status message.
const Lesson = (id: string) => defineComponent({
  setup: () => ({ ...useProgress(), id }),
  template: '<button :aria-pressed="completed.includes(id)" @click="toggle(id)">Marcar etapa</button><p role="status">{{ message }}</p><code>{{ completed.join(",") }}</code>',
})
const saved = () => JSON.parse(localStorage.getItem(progressKey)!)
const projectStep = '/sql/aplicado/analise-financeira/01-preparar'

describe('Progresso salvo no navegador', () => {
  it('marca pelo teclado e restaura a etapa depois de reabrir', async () => {
    const user = userEvent.setup()
    const view = render(Lesson('sql-select'))
    await user.tab()
    await user.keyboard(' ')
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    expect(saved()).toEqual({ version: 2, completed: ['sql-select'] })
    view.unmount()
    render(Lesson('sql-select'))
    await nextTick()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
  it('migra registros dos antigos guias (/pratica/...) sem apagar o original nem entradas desconhecidas', async () => {
    const original = JSON.stringify(['/pratica/api/01-resposta', '/future-note'])
    localStorage.setItem(legacyProgressKey, original)
    render(Lesson('sql-select'))
    await nextTick()
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(legacyProgressKey)).toBe(original)
    expect(saved()).toEqual({ version: 2, completed: ['/future-note', '/python/libs/requests/01-resposta', 'sql-select'] })
  })
  it('permite desmarcar uma etapa sem afetar as outras', async () => {
    localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: [projectStep, 'sql-where'] }))
    render(Lesson(projectStep))
    await nextTick()
    await userEvent.click(screen.getByRole('button'))
    expect(saved().completed).toEqual(['sql-where'])
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })
  it('ignora entradas inválidas e duplicadas', async () => {
    localStorage.setItem(legacyProgressKey, JSON.stringify([projectStep, projectStep, null, 42]))
    render(Lesson(projectStep))
    await nextTick()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector("code")!.textContent).toBe(projectStep)
  })
  it('preserva uma cópia dos dados corrompidos antes de recuperar', async () => {
    localStorage.setItem(progressKey, '{broken')
    render(Lesson('sql-select'))
    await nextTick()
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível ler')
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(`${progressKey}:backup`)).toBe('{broken')
    expect(saved().completed).toEqual(['sql-select'])
  })
  it('não sobrescreve progresso salvo por uma versão futura', async () => {
    const original = JSON.stringify({ version: 99, completed: ['future'] })
    localStorage.setItem(progressKey, original)
    render(Lesson('sql-select'))
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(progressKey)).toBe(original)
    expect(screen.getByRole('status')).toHaveTextContent('outra versão')
  })
  it('mantém o estado honesto quando salvar falha', async () => {
    render(Lesson('sql-select'))
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota') })
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível salvar')
  })
  it('acompanha outras abas e preserva as mudanças delas ao salvar', async () => {
    render(Lesson('sql-select'))
    localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: ['sql-select', 'sql-where', 'unknown'] }))
    window.dispatchEvent(new StorageEvent('storage', { key: progressKey }))
    await nextTick()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button'))
    expect(saved().completed).toEqual(['unknown', 'sql-where'])
  })
  it('continua legível com o armazenamento bloqueado e não tenta gravar', async () => {
    const set = vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    render(Lesson('sql-select'))
    await nextTick()
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível ler')
    await userEvent.click(screen.getByRole('button'))
    expect(set).not.toHaveBeenCalled()
  })
})
