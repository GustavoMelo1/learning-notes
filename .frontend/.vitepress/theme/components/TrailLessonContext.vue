<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { type LearningTrail, trailUrl, trailStepUrl } from '../trails'
import { useProgress } from '../progress'
const props = defineProps<{ trail: LearningTrail; index: number; placement: 'top' | 'bottom' }>()
const { completed, message, toggle } = useProgress()
const step = computed(() => props.trail.steps[props.index])
const previous = computed(() => props.trail.steps[props.index - 1])
const next = computed(() => props.trail.steps[props.index + 1])
</script>
<template>
  <div v-if="placement === 'top'" class="trail-reading-context">
    <nav class="breadcrumb" aria-label="Trilha atual"><a :href="withBase(trailUrl(trail))">{{ trail.title }}</a><span aria-hidden="true">/</span><span>Etapa {{ index + 1 }} de {{ trail.steps.length }}</span></nav>
    <p class="quiet-note">Nesta etapa: {{ step.outcome }}</p>
  </div>
  <section v-else class="lesson-footer" aria-label="Seu próximo passo na trilha">
    <div class="lesson-check"><div><h2>Terminou esta etapa?</h2><p>Marque o conteúdo para retomar seu estudo depois.</p></div><button class="action" :aria-pressed="completed.includes(step.id)" @click="toggle(step.id)">{{ completed.includes(step.id) ? 'Concluída — desmarcar' : 'Marcar como concluída' }}</button></div>
    <p role="status" class="save-message">{{ message }}</p>
    <nav class="lesson-navigation" aria-label="Navegação da trilha"><a :href="withBase(previous ? trailStepUrl(trail, previous) : trailUrl(trail))"><small>{{ previous ? 'Etapa anterior' : 'Voltar à trilha' }}</small>{{ previous?.title || trail.title }}</a><a class="trail-next" :href="withBase(next ? trailStepUrl(trail, next) : trailUrl(trail))"><small>{{ next ? 'Próxima etapa' : 'Revisar seu progresso' }}</small>{{ next?.title || 'Voltar à trilha' }} →</a></nav>
    <a v-if="previous" class="text-link" :href="withBase(trailUrl(trail))">Ver todas as etapas</a>
  </section>
</template>
