<script setup lang="ts">
import { computed, ref } from 'vue'

type Kind = 'INNER' | 'LEFT' | 'FULL'
const kind = ref<Kind>('INNER')
const kinds: Kind[] = ['INNER', 'LEFT', 'FULL']
const revealed = ref(false)
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
function select(value: Kind) { kind.value = value; revealed.value = false }
</script>

<template>
  <section class="join-lab" aria-labelledby="join-lab-title">
    <p class="eyebrow">Laboratório / SQL</p>
    <h2 id="join-lab-title">Quem entra no resultado?</h2>
    <p>As tabelas são as mesmas. Troca a junção e observa o que muda.</p>
    <div class="source-tables">
      <div class="table-scroll" tabindex="0" role="region" aria-label="Tabela funcionários">
        <table><caption>funcionarios · lado esquerdo</caption><thead><tr><th scope="col">id</th><th scope="col">nome</th><th scope="col">dept_id</th></tr></thead>
          <tbody><tr v-for="person in people" :key="person.id"><td>{{ person.id }}</td><td>{{ person.name }}</td><td :class="{ 'null-value': person.department === null }">{{ person.department ?? 'NULL' }}</td></tr></tbody>
        </table>
      </div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Tabela departamentos">
        <table><caption>departamentos · lado direito</caption><thead><tr><th scope="col">id</th><th scope="col">nome</th></tr></thead>
          <tbody><tr v-for="department in departments" :key="department.id"><td>{{ department.id }}</td><td>{{ department.name }}</td></tr></tbody>
        </table>
      </div>
    </div>
    <div class="join-options" role="group" aria-label="Tipo de junção"><button v-for="value in kinds" :key="value" :aria-pressed="kind === value" @click="select(value)">{{ value }} JOIN</button></div>
    <pre class="join-query"><code>SELECT f.nome, d.nome AS departamento
FROM funcionarios AS f
{{ kind === 'FULL' ? 'FULL OUTER' : kind }} JOIN departamentos AS d
  ON f.dept_id = d.id;</code></pre>
    <p v-if="kind === 'FULL'" class="dialect-note">Este é o comportamento de FULL OUTER JOIN em bancos como PostgreSQL. O MySQL não oferece essa sintaxe diretamente.</p>
    <div class="join-challenge">
      <p>Antes de revelar: Pedro aparece? E o departamento Financeiro?</p>
      <button class="reveal-button" :aria-expanded="revealed" aria-controls="join-result" @click="revealed = !revealed">{{ revealed ? 'Ocultar resultado' : 'Mostrar resultado' }}</button>
    </div>
    <div id="join-result" aria-live="polite">
      <template v-if="revealed">
        <p><strong>{{ rows.length }} linhas.</strong> {{ explanations[kind] }}</p>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Resultado da junção">
          <table><caption>Resultado de {{ kind }} JOIN</caption><thead><tr><th scope="col">nome</th><th scope="col">departamento</th><th scope="col">O que aconteceu</th></tr></thead>
            <tbody><tr v-for="(row, index) in rows" :key="index" :class="{ unmatched: !row.matched }"><td :class="{ 'null-value': row.person === null }">{{ row.person ?? 'NULL' }}</td><td :class="{ 'null-value': row.department === null }">{{ row.department ?? 'NULL' }}</td><td>{{ row.matched ? 'Correspondência' : 'Sem correspondência' }}</td></tr></tbody>
          </table>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.join-lab { margin: 28px 0 40px; padding: 24px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 12px; }
.join-lab h2 { border: 0; margin: 8px 0 16px; padding: 0; }
.join-lab p { font-size: 14px; line-height: 1.8; }
.source-tables { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
.table-scroll { overflow-x: auto; }
.join-lab table { display: table; margin: 0; width: 100%; font-size: 13px; white-space: nowrap; }
.join-lab caption { text-align: left; font-family: var(--vp-font-family-mono); font-size: 11px; padding-bottom: 10px; color: var(--vp-c-text-2); }
.join-lab th, .join-lab td { padding: 8px 10px; }
.join-options { display: flex; flex-wrap: wrap; gap: 8px; }
.join-query { overflow-x: auto; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); padding: 16px; margin: 16px 0; border-radius: 8px; font-size: 12px; line-height: 1.9; }
.join-query code { background: transparent; padding: 0; color: var(--vp-c-text-1); }
.join-lab .null-value { color: var(--vp-c-text-2); font-style: italic; font-family: var(--vp-font-family-mono); }
.join-lab .unmatched { background: var(--vp-c-brand-soft); }
.dialect-note { color: var(--vp-c-text-2); border-left: 3px solid var(--vp-c-brand-1); padding-left: 12px; }
.join-challenge { padding: 4px 0 16px; }
.reveal-button { background: var(--vp-c-brand-3); color: white; padding: 9px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; }
@media (max-width: 640px) { .source-tables { grid-template-columns: 1fr; } .join-lab { padding: 16px; } }
</style>
