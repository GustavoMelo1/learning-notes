import { onMounted, onUnmounted, ref } from 'vue'
import { paths } from './paths'
import { trails } from './trails'

export const progressKey = 'learning-notes:progress:v2'
export const legacyProgressKey = 'learning-notes:practice:v1'
const allowed = new Set<string>([...paths.flatMap(path => path.steps.map(step => step.url)), ...trails.flatMap(trail => trail.steps.map(step => step.id))])
const completed = ref<string[]>([])
const message = ref('')
// Preserve progress recorded before lessons were placed under their subjects.
const legacyRoutes: Record<string, string> = Object.fromEntries(paths.flatMap(path => path.steps.map(step => [
  `/pratica/${path.id}/${step.url.split('/').pop()}`, step.url,
])))

let preserved: string[] = []
let corrupt: string | null = null
let writable = true
const strings = (values: unknown[]) => [...new Set(values.filter((value): value is string => typeof value === 'string').map(value => legacyRoutes[value] || value))]
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
      message.value = 'Não foi possível ler o progresso salvo. Tu pode continuar estudando normalmente.'
    }
}

export function useProgress() {
  const onStorage = (event: StorageEvent) => {
    if (event.key === progressKey || event.key === legacyProgressKey || event.key === null) readProgress()
  }
  onMounted(() => { readProgress(); window.addEventListener('storage', onStorage) })
  onUnmounted(() => window.removeEventListener('storage', onStorage))
  function toggle(url: string) {
    if (!allowed.has(url)) return
    // Read the latest state before saving to preserve changes made in another tab.
    readProgress()
    if (!writable) return
    const next = completed.value.includes(url) ? completed.value.filter(item => item !== url) : [...completed.value, url]
    try {
      if (corrupt !== null) localStorage.setItem(`${progressKey}:backup`, corrupt)
      const unknown = preserved.filter(item => !allowed.has(item))
      localStorage.setItem(progressKey, JSON.stringify({ version: 2, completed: [...unknown, ...next] }))
      completed.value = next
      preserved = [...unknown, ...next]
      message.value = next.includes(url) ? 'Etapa marcada como estudada.' : 'Etapa desmarcada.'
    } catch {
      message.value = 'Não foi possível salvar. O navegador pode estar bloqueando o armazenamento. Tenta novamente.'
    }
  }
  return { completed, message, toggle }
}
