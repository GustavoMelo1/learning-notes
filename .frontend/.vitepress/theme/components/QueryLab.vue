<script setup lang="ts">
import { computed, ref } from 'vue'
import LearningLab from './LearningLab.vue'
import GameTable from './GameTable.vue'
import { games } from './lab-data'
const genre = ref('Todos')
const minimum = ref(0)
const columns = ref('titulo, nota')
const rows = computed(() => games.filter(game => (genre.value === 'Todos' || game.genre === genre.value) && game.score >= minimum.value))
const code = computed(() => {
  const conditions = [genre.value === 'Todos' ? '' : `genero = '${genre.value}'`, minimum.value > 0 ? `nota >= ${minimum.value.toFixed(1)}` : ''].filter(Boolean)
  return `SELECT ${columns.value}\nFROM jogos${conditions.length ? '\nWHERE ' + conditions.join(' AND ') : ''};`
})
</script>
<template>
  <LearningLab id="query-lab" title="Colunas ou linhas: o que muda?" :code="code" prompt="Quais jogos vão aparecer? E quais colunas vão sobrar?">
    <template #source><p>SELECT escolhe as colunas. WHERE decide quais linhas passam pelo filtro.</p><GameTable /></template>
    <template #controls>
      <label>Colunas do SELECT<select v-model="columns"><option>titulo</option><option>titulo, nota</option><option>*</option></select></label>
      <label>Gênero<select v-model="genre"><option>Todos</option><option>Survival</option><option>FPS</option><option>RPG</option></select></label>
      <label>Nota mínima: {{ minimum.toFixed(1) }}<input v-model.number="minimum" type="range" min="0" max="10" step="0.5"></label>
    </template>
    <template #result>
      <p><strong>{{ rows.length }} {{ rows.length === 1 ? 'linha' : 'linhas' }}.</strong> Mudar as colunas não altera quais jogos passam pelo WHERE.</p>
      <div v-if="rows.length" class="lab-table" tabindex="0" role="region" aria-label="Resultado do SELECT"><table><thead><tr><th scope="col">titulo</th><th v-if="columns === '*'" scope="col">genero</th><th v-if="columns !== 'titulo'" scope="col">nota</th></tr></thead><tbody><tr v-for="game in rows" :key="game.title"><td>{{ game.title }}</td><td v-if="columns === '*'">{{ game.genre }}</td><td v-if="columns !== 'titulo'">{{ game.score.toFixed(1) }}</td></tr></tbody></table></div>
      <p v-else>Nenhum jogo atende a todos os filtros. O resultado é uma tabela vazia.</p>
    </template>
  </LearningLab>
</template>
