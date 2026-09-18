<script setup lang="ts">
import { computed, ref } from 'vue'
import LearningLab from './LearningLab.vue'
import GameTable from './GameTable.vue'
import { games } from './lab-data'
const minimum = ref(0)
const metric = ref('COUNT')
const having = ref('none')
const expression = computed(() => metric.value === 'COUNT' ? 'COUNT(*)' : 'AVG(nota)')
const threshold = computed(() => metric.value === 'COUNT' ? 1 : 9)
const filtered = computed(() => games.filter(game => game.score >= minimum.value))
const groups = computed(() => [...new Set(filtered.value.map(game => game.genre))].sort().map(genre => {
  const items = filtered.value.filter(game => game.genre === genre)
  return { genre, value: metric.value === 'COUNT' ? items.length : items.reduce((sum, game) => sum + game.score, 0) / items.length }
}))
const result = computed(() => groups.value.filter(group => having.value === 'none' || group.value > threshold.value))
const code = computed(() => `SELECT genero, ${expression.value} AS resultado\nFROM jogos${minimum.value > 0 ? `\nWHERE nota >= ${minimum.value.toFixed(1)}` : ''}\nGROUP BY genero${having.value === 'on' ? `\nHAVING ${expression.value} > ${threshold.value}` : ''}\nORDER BY genero;`)
</script>
<template>
  <LearningLab id="group-lab" title="Das linhas aos grupos" :code="code" prompt="Quantos grupos sobram depois de aplicar WHERE e HAVING?">
    <template #source><p>Filtra os jogos, agrupa por gênero e decide quais grupos ficam.</p><GameTable /></template>
    <template #controls>
      <label>WHERE · nota mínima: {{ minimum.toFixed(1) }}<input v-model.number="minimum" type="range" min="0" max="10" step="0.5"></label>
      <label>Calcular por gênero<select v-model="metric"><option value="COUNT">COUNT · quantidade</option><option value="AVG">AVG · média das notas</option></select></label>
      <label>HAVING · filtrar grupos<select v-model="having"><option value="none">Sem filtro</option><option value="on">{{ expression }} &gt; {{ threshold }}</option></select></label>
    </template>
    <template #result>
      <p><strong>{{ filtered.length }} linhas → {{ groups.length }} grupos → {{ result.length }} no resultado.</strong> WHERE atua antes do agrupamento; HAVING, depois.</p>
      <div v-if="result.length" class="lab-table" tabindex="0" role="region" aria-label="Resultado do agrupamento"><table><thead><tr><th scope="col">genero</th><th scope="col">{{ expression }}</th></tr></thead><tbody><tr v-for="group in result" :key="group.genre"><td>{{ group.genre }}</td><td>{{ metric === 'COUNT' ? group.value : group.value.toFixed(2) }}</td></tr></tbody></table></div>
      <p v-else>Nenhum grupo atende aos filtros. Reduz a nota mínima ou desliga o HAVING para comparar.</p>
    </template>
  </LearningLab>
</template>
