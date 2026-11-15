import { ref } from 'vue'

// Explicit context travels with the URL; direct library visits never inherit a trail.
export const activeTrailId = ref<string | null>(null)
export function syncTrailLocation(href: string) {
  activeTrailId.value = new URL(href, 'https://learning-notes.local').searchParams.get('trilha')
}
