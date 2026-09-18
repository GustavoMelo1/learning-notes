<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { data as notes } from '../notes.data'

const query = ref('')
const category = ref('Todas')
const categories = ['Todas', 'SQL', 'Python', 'BI', 'MongoDB', 'Engenharia de Dados']
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const filtered = computed(() => notes.filter(note =>
  (category.value === 'Todas' || note.category === category.value) &&
  normalize(`${note.title} ${note.description} ${note.category}`).includes(normalize(query.value.trim())),
))
const visibleCount = ref(9)
watch([query, category], () => { visibleCount.value = 9 })
const visibleNotes = computed(() => filtered.value.slice(0, visibleCount.value))
const trails = [
  { title: 'SQL, uma consulta por vez', label: '01 / Consultar', description: 'Do primeiro SELECT às relações entre tabelas.', steps: [
    ['SELECT', '/sql/09-select'], ['WHERE', '/sql/11-where'], ['GROUP BY', '/sql/18-group-by'],
    ['JOIN', '/sql/26-join'], ['Window Functions', '/sql/27-window-function'],
  ] },
  { title: 'Pensando em Python', label: '02 / Programar', description: 'Uma base para entender e escrever teus próprios programas.', steps: [
    ['Tipos e variáveis', '/python/code/00-typevariables'], ['Decisões', '/python/code/05-decisions'],
    ['Laços de repetição', '/python/code/06-forandwhile'], ['Listas', '/python/code/08-list'], ['Funções', '/python/code/12-function'],
  ] },
  { title: 'Dos dados à análise', label: '03 / Conectar', description: 'Entendendo como os dados se organizam para responder perguntas.', steps: [
    ['Business Intelligence', '/data-engineering/business-intelligence'], ['OLTP, OLAP e arquitetura', '/bi/docs'],
    ['Esquema estrela', '/bi/star-schema'], ['Set Analysis', '/bi/qlikview/01-setanalysis'],
  ] },
]
function reset() { query.value = ''; category.value = 'Todas' }
</script>

<template>
  <main class="notebook">
    <header class="catalog-heading"><p class="eyebrow">Caderno aberto</p><h1>Biblioteca</h1><p>Encontra uma anota??o ou escolhe um caminho de leitura.</p></header>
    <details id="trilhas" class="reading-trails"><summary>Trilhas de leitura <span>SQL, Python e dados</span></summary>
      <div class="section-heading"><h2 id="trails-title">Um caminho pra começar</h2><p>Escolhe um assunto e segue no teu ritmo.</p></div>
      <div class="trails">
        <article v-for="trail in trails" :key="trail.title" class="trail">
          <span class="eyebrow">{{ trail.label }}</span><h3>{{ trail.title }}</h3><p>{{ trail.description }}</p>
          <ol><li v-for="[title, url] in trail.steps" :key="url"><a :href="withBase(url)">{{ title }}</a></li></ol>
        </article>
      </div>
    </details>
    <section id="biblioteca" aria-labelledby="library-title">
      <div class="section-heading"><h2 id="library-title">Dentro do caderno</h2><p>{{ notes.length }} notas · 5 assuntos · sempre em construção</p></div>
      <div class="library-controls">
        <label for="note-search">O que tu quer aprender?</label>
        <input id="note-search" v-model="query" type="search" placeholder="Busca por título, assunto ou descrição…" aria-controls="note-results">
        <div class="filters" role="group" aria-label="Filtrar por assunto">
          <button v-for="item in categories" :key="item" :aria-pressed="category === item" @click="category = item">{{ item }} <span aria-hidden="true">{{ item === 'Todas' ? notes.length : notes.filter(note => note.category === item).length }}</span></button>
        </div>
      </div>
      <p class="result-count" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'nota encontrada' : 'notas encontradas' }}{{ category === 'Todas' ? '' : ` em ${category}` }}</p>
      <div id="note-results">
        <div v-if="filtered.length" class="note-grid">
          <a v-for="note in visibleNotes" :key="note.url" class="note-card" :href="withBase(note.url)">
            <span class="eyebrow">{{ note.category }}</span><h3>{{ note.title }}</h3><p>{{ note.description }}</p><span class="read-note">Ler anotação <span aria-hidden="true">↗</span></span>
          </a>
        </div>
        <div v-else class="empty-state"><p>Nenhuma nota por aqui com esse filtro. Tenta outro termo ou assunto.</p><button @click="reset">Limpar busca e filtros</button></div>
        <button v-if="visibleCount < filtered.length" class="load-more" @click="visibleCount += 9">Mostrar mais notas ({{ filtered.length - visibleCount }} restantes)</button>
      </div>
    </section>
  </main>
</template>
