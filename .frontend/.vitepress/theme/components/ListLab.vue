<script setup lang="ts">
import { computed, ref } from 'vue'
import LearningLab from './LearningLab.vue'
const start = ref(0)
const end = ref(3)
const items = ['a', 'b', 'c', 'd', 'e']
const indexes = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
const selectedIndexes = computed(() => items.map((_, index) => index).slice(start.value, end.value))
const result = computed(() => items.slice(start.value, end.value))
const code = computed(() => `letras = ['a', 'b', 'c', 'd', 'e']\nprint(letras[${start.value}:${end.value}])`)
</script>
<template>
  <LearningLab id="list-lab" title="Onde o recorte começa e termina?" :code="code" prompt="Quais letras entram no recorte? O índice final fica de fora.">
    <template #source><p>Os índices começam em zero. Índices negativos contam a partir do fim.</p><div class="list-items"><div v-for="(item, index) in items" :key="item" class="list-item"><strong>{{ item }}</strong><small>{{ index }} / {{ index - items.length }}</small></div></div></template>
    <template #controls><label>Início (incluído)<select v-model.number="start"><option v-for="index in indexes" :key="index" :value="index">{{ index }}</option></select></label><label>Fim (excluído)<select v-model.number="end"><option v-for="index in indexes" :key="index" :value="index">{{ index }}</option></select></label></template>
    <template #result>
      <pre class="lab-code"><code>{{ result.length ? "['" + result.join("', '") + "']" : '[]' }}</code></pre>
      <div class="list-items"><div v-for="(item, index) in items" :key="item" class="list-item" :class="{ selected: selectedIndexes.includes(index) }"><strong>{{ item }}</strong><small>{{ selectedIndexes.includes(index) ? 'incluído' : 'fora' }}</small></div></div>
      <p>{{ result.length ? 'O recorte inclui o início e para antes do fim. A lista original continua igual.' : 'Com passo positivo, se o início fica no fim ou depois do fim do recorte, o resultado é uma lista vazia.' }}</p>
    </template>
  </LearningLab>
</template>
