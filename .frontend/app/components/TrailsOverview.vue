<script setup lang="ts">
import { trailGroups, trails } from '~/lib/trails'
import { useProgress } from '~/lib/progress'
import { vReveal } from '~/lib/motion'
import TrailEntry from './TrailEntry.vue'

const { completed, message } = useProgress()
const groups = trailGroups.map(group => ({ ...group, trails: trails.filter(trail => trail.kind === group.kind) }))
</script>

<template>
  <div class="page trails-page">
    <header class="page-heading">
      <h1>Trilhas</h1>
      <p>Sequências de notas reais da biblioteca. Comece pelos fundamentos, marque o que estudou e retome de onde parou.</p>
    </header>
    <section v-for="(group, groupIndex) in groups" :id="group.kind === 'projeto' ? 'projetos' : group.kind" :key="group.kind" class="section" :aria-labelledby="`group-${group.kind}`">
      <div class="section-heading"><h2 :id="`group-${group.kind}`">{{ group.title }}</h2><p>{{ group.description }}</p></div>
      <ol v-reveal.stagger class="trail-list">
        <TrailEntry v-for="(trail, index) in group.trails" :key="trail.id" :trail="trail" :number="index + 1 + groups.slice(0, groupIndex).reduce((sum, item) => sum + item.trails.length, 0)" :completed="completed" />
      </ol>
    </section>
    <p v-if="message" class="save-message" role="status">{{ message }}</p>
    <p class="margin-note" style="margin-top: 48px; max-width: 420px">o progresso fica só neste navegador. sem conta, sem envio a servidores.</p>
  </div>
</template>
