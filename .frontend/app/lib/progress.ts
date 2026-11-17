import { onMounted, onUnmounted, ref } from 'vue'
import { allStepIds, trails } from './trails'

/**
 * Progress lives only in this browser (localStorage). The format is versioned:
 * { version: 2, completed: string[] }. Unknown ids are kept, never dropped, so an older
 * or newer version of the site can still read what was saved.
 */
export const progressKey = 'learning-notes:progress:v2'
export const legacyProgressKey = 'learning-notes:practice:v1'

const allowed = allStepIds()
const completed = ref<string[]>([])
const message = ref('')

// Lessons used to live under /pratica/<guide>/<lesson>; map those saved ids to their current URL.
const legacyRoutes: Record<string, string> = Object.fromEntries(trails
  .filter(trail => trail.steps.every(step => step.id === step.url))
  .flatMap(trail => trail.steps.map(step => [`/pratica/${trail.id}/${step.url.split('/').pop()}`, step.url])))

let preserved: string[] = []
let corrupt: string | null = null
let writable = true
const strings = (values: unknown[]) => [...new Set(values
  .filter((value): value is string => typeof value === 'string')
  .map(value => legacyRoutes[value] || value))]

function readItem(key: string) {
  try { return localStorage.getItem(key) }
  catch (error) { writable = false; throw error }
}

function readProgress() {
  corrupt = null
  writable = true
  preserved = []
  try {
    const raw = readItem(progressKey)
    if (raw !== null) {
      try {
        const saved = JSON.parse(raw)
        if (saved && typeof saved.version === 'number' && saved.version !== 2) {
          writable = false
          completed.value = []
          message.value = 'Este progresso foi salvo por outra versão. Os dados foram preservados; você pode continuar lendo.'
          return
        }
        if (!saved || saved.version !== 2 || !Array.isArray(saved.completed)) throw new Error('Invalid progress')
        preserved = strings(saved.completed)
      } catch { corrupt = raw }
    }
    if (raw === null || corrupt !== null) {
      const legacy = JSON.parse(readItem(legacyProgressKey) || '[]')
      if (!Array.isArray(legacy)) throw new Error('Invalid legacy progress')
      preserved = strings(legacy)
    }
    completed.value = preserved.filter(id => allowed.has(id))
    message.value = corrupt !== null ? 'Não foi possível ler o progresso salvo. Ao marcar uma etapa, uma cópia dos dados anteriores será preservada.' : ''
  } catch {
    completed.value = []
    message.value = 'Não foi possível ler o progresso salvo. Você pode continuar estudando normalmente.'
  }
}

export function useProgress() {
  const onStorage = (event: StorageEvent) => {
    if (event.key === progressKey || event.key === legacyProgressKey || event.key === null) readProgress()
  }
  onMounted(() => { readProgress(); window.addEventListener('storage', onStorage) })
  onUnmounted(() => window.removeEventListener('storage', onStorage))

  function toggle(id: string) {
    if (!allowed.has(id)) return
    // Read the latest state first so changes made in another tab are kept.
    readProgress()
    if (!writable) return
    const next = completed.value.includes(id) ? completed.value.filter(item => item !== id) : [...completed.value, id]
    try {
      if (corrupt !== null) localStorage.setItem(`${progressKey}:backup`, corrupt)
      const unknown = preserved.filter(item => !allowed.has(item))
      localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: [...unknown, ...next] }))
      completed.value = next
      preserved = [...unknown, ...next]
      message.value = next.includes(id) ? 'Etapa marcada como concluída.' : 'Etapa desmarcada.'
    } catch {
      message.value = 'Não foi possível salvar. O navegador pode estar bloqueando o armazenamento. Tente novamente.'
    }
  }
  return { completed, message, toggle }
}
