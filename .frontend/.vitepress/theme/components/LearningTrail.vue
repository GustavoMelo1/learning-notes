<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { trails, trailProgress, trailStepUrl } from '../trails'
import { useProgress } from '../progress'
import ProgressIndicator from './ProgressIndicator.vue'
const props = defineProps<{ id: string }>()
const trail = computed(() => trails.find(item => item.id === props.id))
const { completed, message } = useProgress()
const progress = computed(() => trail.value && trailProgress(trail.value, completed.value))
</script>
<template>
  <div v-if="trail && progress" class="notebook trail-page">
    <nav class="breadcrumb" aria-label="Localização"><a :href="withBase('/trilhas/')">Trilhas</a><span aria-hidden="true">/</span><span>{{ trail.title }}</span></nav>
    <header class="page-heading"><p class="eyebrow">{{ trail.level }} · {{ trail.steps.length }} etapas</p><h1>{{ trail.title }}</h1><p>{{ trail.description }}</p></header>
    <div class="trail-overview"><section aria-labelledby="trail-objectives"><h2 id="trail-objectives">O que você vai aprender</h2><ul><li v-for="objective in trail.objectives" :key="objective">{{ objective }}</li></ul><p class="quiet-note"><strong>Antes de começar:</strong> {{ trail.prerequisites }}</p></section><section class="trail-resume" aria-label="Seu progresso"><ProgressIndicator :count="progress.count" :total="progress.total" :label="`Progresso: ${trail.title}`" /><a class="action primary-action" :href="withBase(trailStepUrl(trail, progress.next || trail.steps[0]))">{{ !progress.next ? 'Revisar primeira etapa' : progress.count ? 'Continuar estudo' : 'Começar trilha' }} →</a><p class="quiet-note">{{ progress.next ? `Próximo conteúdo: ${progress.next.title}` : 'Todas as etapas foram marcadas. Você pode revisá-las quando quiser.' }}</p></section></div>
    <p v-if="message" role="status" class="save-message">{{ message }}</p>
    <section aria-labelledby="trail-sequence"><div class="section-heading"><h2 id="trail-sequence">Seu caminho de estudo</h2><span class="muted">Uma etapa de cada vez.</span></div><ol class="trail-sequence"><li v-for="(step, index) in trail.steps" :key="step.id"><a :href="withBase(trailStepUrl(trail, step))"><span class="trail-step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><span><strong>{{ step.title }}</strong><span class="trail-step-outcome">{{ step.outcome }}</span></span><span class="trail-step-state">{{ completed.includes(step.id) ? 'Concluída' : progress.next?.id === step.id ? 'Próxima' : 'A estudar' }}</span></a></li></ol></section>
    <p class="quiet-note">Marque a etapa na página do conteúdo. O progresso é salvo neste navegador.</p>
  </div>
  <div v-else class="notebook"><h1>Trilha não encontrada.</h1><a :href="withBase('/trilhas/')">Ver trilhas disponíveis</a></div>
</template>
