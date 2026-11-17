<script setup lang="ts">
// A sticky note on top of the page: which trail this is, where you are, what this step teaches.
import { type LearningTrail, trailUrl } from '~/lib/trails'

defineProps<{ trail: LearningTrail; index: number; done: string[] }>()
</script>

<template>
  <aside class="trail-note" aria-label="Etapa da trilha">
    <div class="trail-note-head">
      <NuxtLink :to="trailUrl(trail)">{{ trail.kind === 'projeto' ? `Projeto: ${trail.short}` : `Trilha de ${trail.short}` }}</NuxtLink>
      <span class="mono-meta">etapa {{ index + 1 }} de {{ trail.steps.length }}</span>
    </div>
    <p v-if="trail.steps[index].outcome">Nesta etapa: {{ trail.steps[index].outcome }}</p>
    <div class="trail-dots" aria-hidden="true">
      <span v-for="(step, i) in trail.steps" :key="step.id" :class="{ 'is-done': done.includes(step.id), 'is-current': i === index }" />
    </div>
  </aside>
</template>
