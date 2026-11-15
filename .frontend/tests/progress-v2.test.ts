import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TrailLessonContext from '../.vitepress/theme/components/TrailLessonContext.vue'
import { trails } from '../.vitepress/theme/trails'
import { progressKey, legacyProgressKey } from '../.vitepress/theme/progress'

vi.mock('vitepress', () => ({ withBase: (url: string) => `/learning-notes${url}` }))
const mount = () => render(TrailLessonContext, { props: { trail: trails[0], index: 0, placement: 'bottom' } })
const saved = () => JSON.parse(localStorage.getItem(progressKey)!)
describe('Persistência versionada', () => {
  it('migra registros antigos sem apagar o original ou entradas desconhecidas', async () => {
    const original = JSON.stringify(['/pratica/api/01-resposta', '/future-note'])
    localStorage.setItem(legacyProgressKey, original)
    mount()
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(legacyProgressKey)).toBe(original)
    expect(saved()).toEqual({ version: 2, completed: ['/future-note', '/python/libs/requests/01-resposta', 'sql-select'] })
  })
  it('não recupera uma conclusão desmarcada a partir da chave antiga', async () => {
    localStorage.setItem(legacyProgressKey, JSON.stringify(['sql-select']))
    const view = mount()
    await nextTick()
    await userEvent.click(screen.getByRole('button'))
    view.unmount()
    mount()
    await nextTick()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    expect(saved().completed).toEqual([])
  })
  it('preserva uma cópia dos dados corrompidos antes de recuperar', async () => {
    localStorage.setItem(progressKey, '{broken')
    mount()
    await nextTick()
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível ler')
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(`${progressKey}:backup`)).toBe('{broken')
    expect(saved().completed).toEqual(['sql-select'])
  })
  it('não sobrescreve versões futuras', async () => {
    const original = JSON.stringify({ version: 99, completed: ['future'] })
    localStorage.setItem(progressKey, original)
    mount()
    await userEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem(progressKey)).toBe(original)
    expect(screen.getByRole('status')).toHaveTextContent('outra versão')
  })
  it('mantém o estado honesto quando salvar falha', async () => {
    mount()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota') })
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('status')).toHaveTextContent('Não foi possível salvar')
  })
  it('acompanha outras abas e preserva mudanças ao salvar', async () => {
    mount()
    localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: ['sql-select', 'sql-where', 'unknown'] }))
    window.dispatchEvent(new StorageEvent('storage', { key: progressKey }))
    await nextTick()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button'))
    expect(saved().completed).toEqual(['unknown', 'sql-where'])
  })
  it('permite ler com armazenamento bloqueado sem sobrescrever dados', async () => {
    const set = vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    mount()
    await userEvent.click(screen.getByRole('button'))
    expect(set).not.toHaveBeenCalled()
    expect(screen.getByRole('link', { name: /Próxima etapa/ })).toBeVisible()
  })
})
