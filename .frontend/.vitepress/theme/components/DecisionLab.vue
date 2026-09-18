<script setup lang="ts">
import { computed, ref } from 'vue'
import LearningLab from './LearningLab.vue'
const score = ref(4)
const result = computed(() => score.value <= 4 ? 'Reprovado' : score.value <= 6 ? 'Exame' : 'Aprovado')
const explanation = computed(() => score.value <= 4 ? 'O primeiro if é verdadeiro. Os outros blocos não são executados.' : score.value <= 6 ? 'O if é falso, mas o elif é verdadeiro. Só o bloco do elif é executado.' : 'As duas condições são falsas. O código entra no else.')
const code = computed(() => `nota = ${score.value}\n\nif nota <= 4:\n    print("Reprovado")\nelif nota <= 6:\n    print("Exame")\nelse:\n    print("Aprovado")`)
</script>
<template>
  <LearningLab id="decision-lab" title="Qual caminho o código segue?" :code="code" prompt="Qual mensagem será impressa? Testa também os limites 4, 6 e 7.">
    <template #controls><label>Nota: {{ score }}<input v-model.number="score" type="range" min="0" max="10" step="1"></label></template>
    <template #result><pre class="lab-code"><code>{{ result }}</code></pre><p>{{ explanation }}</p></template>
  </LearningLab>
</template>
