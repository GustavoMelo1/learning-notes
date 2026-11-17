<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { type LearningTrail, trailUrl, trailStepUrl, trailProgress } from '../trails'
import ProgressIndicator from './ProgressIndicator.vue'
const props = defineProps<{ trail: LearningTrail; completed: string[] }>()
const progress = computed(() => trailProgress(props.trail, props.completed))
const action = computed(() => progress.value.count === progress.value.total ? 'Revisar trilha' : progress.value.count ? 'Continuar' : 'Conhecer trilha')
</script>
<template>
  <article class="trail-card">
    <p class="trail-meta">{{ trail.level }} · {{ trail.steps.length }} etapas</p>
    <h2><a :href="withBase(trailUrl(trail))">{{ trail.title }}</a></h2>
    <p class="trail-description">{{ trail.description }}</p>
    <p class="trail-topics">{{ trail.subjects.join(' · ') }}</p>
    <ProgressIndicator :count="progress.count" :total="progress.total" :label="`Progresso: ${trail.title}`" />
    <div class="guide-actions"><a class="text-link pen-link" :href="withBase(progress.count && progress.next ? trailStepUrl(trail, progress.next) : trailUrl(trail))">{{ action }}</a><a v-if="progress.count && progress.next" class="text-link quiet-link" :href="withBase(trailUrl(trail))">Ver etapas</a></div>
  </article>
</template>
