<script setup lang="ts">
// One trail as a line of the summary: number, title, what it covers and how far you are.
import { computed } from 'vue'
import { type LearningTrail, trailProgress, trailStepUrl, trailUrl } from '~/lib/trails'
import ProgressIndicator from './ProgressIndicator.vue'

const props = defineProps<{ trail: LearningTrail; number: number; completed: string[] }>()
const progress = computed(() => trailProgress(props.trail, props.completed))
const action = computed(() => progress.value.done ? 'Revisar trilha' : progress.value.count ? 'Continuar trilha' : 'Conhecer trilha')
const target = computed(() => progress.value.count && progress.value.next ? trailStepUrl(props.trail, progress.value.next) : trailUrl(props.trail))
</script>

<template>
  <li class="trail-entry">
    <span class="toc-number" aria-hidden="true">{{ String(number).padStart(2, '0') }}</span>
    <div>
      <h3 style="margin-top: 0"><NuxtLink :to="trailUrl(trail)">{{ trail.title }}</NuxtLink></h3>
      <p>{{ trail.description }}</p>
      <p class="trail-topics">{{ trail.subjects.join(' · ') }}</p>
    </div>
    <div class="trail-entry-side">
      <ProgressIndicator :count="progress.count" :total="progress.total" :label="`Progresso: ${trail.title}`" />
      <NuxtLink class="text-link" :to="target">{{ action }}</NuxtLink>
    </div>
  </li>
</template>
