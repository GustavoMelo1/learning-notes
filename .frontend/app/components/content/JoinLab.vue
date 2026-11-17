<script setup lang="ts">
import { computed, ref } from 'vue'
import LearningLab from '../LearningLab.vue'

type Kind = 'INNER' | 'LEFT' | 'FULL'
const kind = ref<Kind>('INNER')
const kinds: Kind[] = ['INNER', 'LEFT', 'FULL']
const people = [
  { id: 1, name: 'Ana', department: 10 },
  { id: 2, name: 'Carlos', department: 20 },
  { id: 3, name: 'Pedro', department: null },
]
const departments = [{ id: 10, name: 'TI' }, { id: 20, name: 'RH' }, { id: 30, name: 'Financeiro' }]
const rows = computed(() => {
  const result: { person: string | null; department: string | null; matched: boolean }[] = []
  for (const person of people) {
    const matches = departments.filter(department => department.id === person.department)
    for (const department of matches) result.push({ person: person.name, department: department.name, matched: true })
    if (!matches.length && kind.value !== 'INNER') result.push({ person: person.name, department: null, matched: false })
  }
  if (kind.value === 'FULL') {
    for (const department of departments) {
      if (!people.some(person => person.department === department.id)) result.push({ person: null, department: department.name, matched: false })
    }
  }
  return result
})
const explanations: Record<Kind, string> = {
  INNER: 'Só entram as correspondências: Ana com TI e Carlos com RH. Pedro e Financeiro ficam de fora.',
  LEFT: 'Todos os funcionários entram. Pedro não tem departamento, então a coluna do departamento recebe NULL.',
  FULL: 'Entram os dois lados completos. Pedro aparece sem departamento e Financeiro aparece sem funcionário.',
}
function select(value: Kind) { kind.value = value }
const code = computed(() => `SELECT f.nome, d.nome AS departamento
FROM funcionarios AS f
${kind.value === 'FULL' ? 'FULL OUTER' : kind.value} JOIN departamentos AS d
  ON f.dept_id = d.id;`)
</script>

<template>
  <LearningLab id="join-lab" title="Quem entra no resultado?" :code="code" prompt="Quantas linhas esse JOIN devolve? Pense em Pedro e no departamento Financeiro." :expected="rows.length">
    <template #source>
      <p>As tabelas são as mesmas. Troque a junção e observe o que muda.</p>
      <div class="source-tables">
        <div class="lab-table" tabindex="0" role="region" aria-label="Tabela funcionários">
          <table><caption>funcionarios · lado esquerdo</caption><thead><tr><th scope="col">id</th><th scope="col">nome</th><th scope="col">dept_id</th></tr></thead>
            <tbody><tr v-for="person in people" :key="person.id"><td>{{ person.id }}</td><td>{{ person.name }}</td><td :class="{ 'null-value': person.department === null }">{{ person.department ?? 'NULL' }}</td></tr></tbody>
          </table>
        </div>
        <div class="lab-table" tabindex="0" role="region" aria-label="Tabela departamentos">
          <table><caption>departamentos · lado direito</caption><thead><tr><th scope="col">id</th><th scope="col">nome</th></tr></thead>
            <tbody><tr v-for="department in departments" :key="department.id"><td>{{ department.id }}</td><td>{{ department.name }}</td></tr></tbody>
          </table>
        </div>
      </div>
    </template>
    <template #controls>
      <div class="join-options" role="group" aria-label="Tipo de junção"><button v-for="value in kinds" :key="value" type="button" :aria-pressed="kind === value" @click="select(value)">{{ value }} JOIN</button></div>
      <p v-if="kind === 'FULL'" class="dialect-note">Este é o comportamento de FULL OUTER JOIN em bancos como PostgreSQL. O MySQL não oferece essa sintaxe diretamente.</p>
    </template>
    <template #result>
      <p><strong>{{ rows.length }} linhas.</strong> {{ explanations[kind] }}</p>
      <div class="lab-table" tabindex="0" role="region" aria-label="Resultado da junção">
        <table><caption>Resultado de {{ kind }} JOIN</caption><thead><tr><th scope="col">nome</th><th scope="col">departamento</th><th scope="col">O que aconteceu</th></tr></thead>
          <tbody><tr v-for="(row, index) in rows" :key="index" :class="{ unmatched: !row.matched }"><td :class="{ 'null-value': row.person === null }">{{ row.person ?? 'NULL' }}</td><td :class="{ 'null-value': row.department === null }">{{ row.department ?? 'NULL' }}</td><td>{{ row.matched ? 'Correspondência' : 'Sem correspondência' }}</td></tr></tbody>
        </table>
      </div>
    </template>
  </LearningLab>
</template>

<style scoped>
.source-tables { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px; }
.null-value { color: var(--ink-3); font-style: italic; font-family: var(--font-mono); }
.unmatched { background: var(--marker-soft); }
.dialect-note { flex-basis: 100%; color: var(--ink-2); border-left: 2px solid var(--margin-line); padding-left: 12px; font-size: 15px; }
@media (max-width: 640px) { .source-tables { grid-template-columns: 1fr; } }
</style>
