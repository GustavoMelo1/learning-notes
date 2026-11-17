import { computed } from 'vue'
import { toNotes, type NoteDoc } from '~/lib/notes'

/** Every note of the library, in reading order. Prerendered into each page's payload. */
export function useNotes() {
  const { data } = useAsyncData('notes-index', () =>
    queryCollection('notes').select('path', 'title', 'description', 'search').all())
  return computed(() => toNotes((data.value || []) as NoteDoc[]).filter(note => !note.url.startsWith('/pratica')))
}
