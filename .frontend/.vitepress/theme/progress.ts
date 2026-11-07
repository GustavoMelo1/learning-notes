import { onMounted, ref } from 'vue'
import { paths } from './paths'

const key = 'learning-notes:practice:v1'
const allowed = new Set(paths.flatMap(path => path.steps.map(step => step.url)))
const completed = ref<string[]>([])
const message = ref('')
// Preserve progress recorded before lessons were placed under their subjects.
const legacyRoutes = Object.fromEntries(paths.flatMap(path => path.steps.map(step => [
  `/pratica/${path.id}/${step.url.split('/').pop()}`, step.url,
])))

export function useProgress() {
  onMounted(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]')
      completed.value = Array.isArray(saved) ? [...new Set(saved
        .filter(url => typeof url === 'string')
        .map(url => legacyRoutes[url] || url)
        .filter(url => allowed.has(url)))] : []
      message.value = ''
    } catch {
      completed.value = []
      message.value = 'Não foi possível ler o progresso salvo. Tu pode continuar estudando normalmente.'
    }
  })
  function toggle(url: string) {
    if (!allowed.has(url)) return
    const next = completed.value.includes(url) ? completed.value.filter(item => item !== url) : [...completed.value, url]
    try {
      localStorage.setItem(key, JSON.stringify(next))
      completed.value = next
      message.value = next.includes(url) ? 'Etapa marcada como estudada.' : 'Etapa desmarcada.'
    } catch {
      message.value = 'Não foi possível salvar. O navegador pode estar bloqueando o armazenamento. Tenta novamente.'
    }
  }
  return { completed, message, toggle }
}
