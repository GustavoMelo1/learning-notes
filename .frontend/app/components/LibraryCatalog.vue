<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { Note } from '~/lib/notes'
import { subjects } from '~/lib/subjects'

const props = defineProps<{ notes: Note[] }>()
const query = ref('')
const subject = ref<string | null>(null)
const kind = ref<'Tudo' | 'Anotação' | 'Projeto'>('Tudo')
const kinds = [{ value: 'Tudo', label: 'Tudo' }, { value: 'Anotação', label: 'Anotações' }, { value: 'Projeto', label: 'Projetos' }] as const
const pageSize = 12
const visibleCount = ref(pageSize)
const search = ref<HTMLInputElement>()
const results = ref<HTMLElement>()

const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const filtered = computed(() => props.notes.filter(note =>
  (!subject.value || note.folder === subject.value)
  && (kind.value === 'Tudo' || note.kind === kind.value)
  && normalize(`${note.title} ${note.label} ${note.description} ${note.category}`).includes(normalize(query.value.trim()))))
const visibleNotes = computed(() => filtered.value.slice(0, visibleCount.value))
watch([query, subject, kind], () => { visibleCount.value = pageSize })

async function reset() {
  query.value = ''; subject.value = null; kind.value = 'Tudo'
  await nextTick()
  search.value?.focus()
}
async function more() {
  const firstNew = visibleCount.value
  visibleCount.value += pageSize
  await nextTick()
  results.value?.querySelectorAll<HTMLAnchorElement>('.note-row')[firstNew]?.focus()
}
</script>

<template>
  <div class="page catalog-page">
    <header class="page-heading">
      <h1>Biblioteca</h1>
      <p>Encontre uma explicação, revise um conceito ou explore um assunto. Para aprender em sequência, siga uma <NuxtLink to="/trilhas">trilha</NuxtLink>.</p>
    </header>

    <form class="library-search" role="search" aria-label="Buscar na biblioteca" @submit.prevent>
      <label for="note-search">o que você quer revisar?</label>
      <input id="note-search" ref="search" v-model="query" type="search" placeholder="Título, conceito ou assunto" aria-controls="note-results" autocomplete="off">
    </form>
    <div class="chip-row" role="group" aria-label="Assunto">
      <button type="button" class="chip" :aria-pressed="subject === null" @click="subject = null">Todos os assuntos</button>
      <button v-for="item in subjects" :key="item.folder" type="button" class="chip" :aria-pressed="subject === item.folder" @click="subject = item.folder">{{ item.name }}</button>
    </div>
    <div class="library-toolbar">
      <div class="kind-tabs" role="group" aria-label="Tipo de conteúdo">
        <button v-for="item in kinds" :key="item.value" type="button" :aria-pressed="kind === item.value" @click="kind = item.value">{{ item.label }}</button>
      </div>
      <p class="result-count" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'resultado' : 'resultados' }}</p>
    </div>

    <div id="note-results" ref="results">
      <ul v-if="filtered.length" class="note-list">
        <template v-for="(note, index) in visibleNotes" :key="note.url">
          <li v-if="!subject && note.category !== visibleNotes[index - 1]?.category" class="note-group" aria-hidden="true">{{ note.category }}</li>
          <li>
            <NuxtLink class="note-row" :to="note.url">
              <h2>{{ note.label }}</h2>
              <p>{{ note.description }}</p>
              <span v-if="note.kind === 'Projeto'" class="note-tag">projeto</span>
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div v-else class="empty-state">
        <h2>Nada encontrado por aqui.</h2>
        <p>Tente um termo mais curto ou outro assunto.</p>
        <button class="action" type="button" @click="reset">Limpar busca e filtros</button>
      </div>
      <button v-if="visibleCount < filtered.length" class="load-more action" type="button" @click="more">Mostrar mais ({{ filtered.length - visibleCount }} restantes)</button>
    </div>
    <p class="quiet-note" style="margin-top: 40px">Prefere uma lista completa, sem filtros? <NuxtLink to="/indice">Veja todas as notas</NuxtLink>.</p>
  </div>
</template>
