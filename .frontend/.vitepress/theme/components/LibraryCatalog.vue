<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { data as notes } from '../notes.data'
import StudyStarts from './StudyStarts.vue'

const query = ref('')
const category = ref('Todos os assuntos')
const kind = ref('Tudo')
const categories = computed(() => ['Todos os assuntos', ...new Set(notes.map(note => note.category))])
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const filtered = computed(() => notes.filter(note =>
  (category.value === 'Todos os assuntos' || note.category === category.value) &&
  (kind.value === 'Tudo' || note.kind === kind.value) &&
  normalize(`${note.title} ${note.description} ${note.category}`).includes(normalize(query.value.trim())),
))
const visibleCount = ref(12)
const search = ref<HTMLInputElement>()
const results = ref<HTMLElement>()
watch([query, category, kind], () => { visibleCount.value = 12 })
const visibleNotes = computed(() => filtered.value.slice(0, visibleCount.value))
async function reset() { query.value = ''; category.value = 'Todos os assuntos'; kind.value = 'Tudo'; await nextTick(); search.value?.focus() }
async function more() {
  const firstNew = visibleCount.value
  visibleCount.value += 12
  await nextTick()
  results.value?.querySelectorAll<HTMLAnchorElement>('.note-row')[firstNew]?.focus()
}
</script>

<template>
  <div class="notebook catalog-page">
    <header class="page-heading"><p class="eyebrow">Learning Notes</p><h1>Um assunto de cada vez.</h1><p>Segue um guia para aprender ou busca uma nota para consultar.</p></header>
    <StudyStarts />
    <div class="section-heading catalog-heading"><div><p class="eyebrow">Consultar</p><h2>Encontra uma nota.</h2></div><a class="text-link" :href="withBase('/indice')">Índice completo →</a></div>
    <form class="library-controls" role="search" aria-label="Buscar na biblioteca" @submit.prevent>
      <div class="search-field"><label for="note-search">Buscar nas notas</label><input id="note-search" ref="search" v-model="query" type="search" placeholder="Título, conceito ou assunto" aria-controls="note-results" autocomplete="off"></div>
      <div class="subject-field"><label for="note-category">Assunto</label><select id="note-category" v-model="category" aria-controls="note-results"><option v-for="item in categories" :key="item">{{ item }}</option></select></div>
    </form>
    <div class="catalog-toolbar"><div class="format-filters" role="group" aria-label="Tipo de conteúdo"><button v-for="item in ['Tudo', 'Anotação', 'Prática']" :key="item" :aria-pressed="kind === item" @click="kind = item">{{ item === 'Anotação' ? 'Anotações' : item }}</button></div><p class="result-count" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'resultado' : 'resultados' }}</p></div>
    <div id="note-results" ref="results">
      <p v-if="filtered.length" class="quiet-note">Exibindo {{ visibleNotes.length }} de {{ filtered.length }}. {{ visibleNotes.length < filtered.length ? 'Usa Mostrar mais abaixo ou abre o índice completo.' : 'Todos os resultados estão nesta lista.' }}</p>
      <ul v-if="filtered.length" class="note-list"><li v-for="note in visibleNotes" :key="note.url"><a class="note-row" :href="withBase(note.url)"><span class="note-meta">{{ note.category }}<small>{{ note.kind }}</small></span><span class="note-content"><h2>{{ note.title }}</h2><p>{{ note.description }}</p></span><span class="note-arrow" aria-hidden="true">↗</span></a></li></ul>
      <div v-else class="empty-state"><h2>Nada encontrado por aqui.</h2><p>Tenta um termo mais curto ou outro assunto.</p><button class="action" @click="reset">Limpar busca e filtros</button></div>
      <button v-if="visibleCount < filtered.length" class="load-more action" @click="more">Mostrar mais <span class="muted">({{ filtered.length - visibleCount }} restantes)</span></button>
    </div>
    <aside class="catalog-help"><h2>Prefere seguir um caminho?</h2><p>Os guias começam pelo assunto e mostram como aplicá-lo em exemplos completos.</p><a class="text-link" :href="withBase('/pratica/')">Escolher um assunto →</a><details class="reading-trails"><summary>Começando pelos fundamentos</summary><ul><li><a :href="withBase('/sql/09-select')">SQL: SELECT → WHERE → GROUP BY → JOIN</a></li><li><a :href="withBase('/python/code/00-typevariables')">Python: tipos → decisões → laços → funções</a></li><li><a :href="withBase('/bi/docs')">BI: arquitetura → esquema estrela → análise</a></li></ul></details></aside>
  </div>
</template>
