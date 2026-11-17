<script setup lang="ts">
import { computed } from 'vue'
import { type LearningTrail, trailProgress, trailStepUrl } from '~/lib/trails'
import { useProgress } from '~/lib/progress'
import { vReveal } from '~/lib/motion'
import ProgressIndicator from './ProgressIndicator.vue'
import HandCheck from './HandCheck.vue'

const props = defineProps<{ trail: LearningTrail }>()
const { completed, message } = useProgress()
const progress = computed(() => trailProgress(props.trail, completed.value))
const action = computed(() => progress.value.done ? 'Revisar a primeira etapa' : progress.value.count ? 'Continuar estudo' : 'Começar trilha')
const target = computed(() => trailStepUrl(props.trail, progress.value.next || props.trail.steps[0]))
</script>

<template>
  <div class="page trail-page">
    <nav class="breadcrumb" aria-label="Localização"><NuxtLink to="/trilhas">Trilhas</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ trail.short }}</span></nav>
    <header class="page-heading">
      <p class="mono-meta">{{ trail.level }} · {{ trail.steps.length }} etapas</p>
      <h1>{{ trail.title }}</h1>
      <p>{{ trail.description }}</p>
    </header>

    <div class="trail-overview">
      <section aria-labelledby="trail-objectives">
        <h2 id="trail-objectives">O que você vai aprender</h2>
        <ul><li v-for="objective in trail.objectives" :key="objective">{{ objective }}</li></ul>
        <p class="quiet-note"><strong>Antes de começar:</strong> {{ trail.prerequisites }}</p>
        <p v-if="trail.intro || trail.source" class="actions-row" style="margin-top: 8px">
          <NuxtLink v-if="trail.intro" class="text-link" :to="trail.intro">Ler a introdução</NuxtLink>
          <a v-if="trail.source" class="text-link quiet-link" :href="trail.source.url">Código de origem ↗</a>
        </p>
      </section>
      <section class="trail-resume" aria-label="Seu progresso">
        <ProgressIndicator :count="progress.count" :total="progress.total" :label="`Progresso: ${trail.title}`" />
        <NuxtLink class="action primary" :to="target">{{ action }}</NuxtLink>
        <p class="quiet-note">{{ progress.next ? `Próximo conteúdo: ${progress.next.title}` : 'Todas as etapas foram marcadas. Você pode revisá-las quando quiser.' }}</p>
        <p v-if="progress.gaps.length" class="margin-note" style="margin-top: 14px">{{ progress.gaps.length === 1 ? 'uma etapa ficou para trás' : `${progress.gaps.length} etapas ficaram para trás` }} — dá pra voltar depois.</p>
      </section>
    </div>
    <p v-if="message" class="save-message" role="status">{{ message }}</p>

    <section class="section" aria-labelledby="trail-sequence">
      <div class="section-heading"><h2 id="trail-sequence">Seu caminho de estudo</h2><p>Uma etapa de cada vez.</p></div>
      <ol v-reveal.stagger class="trail-sequence">
        <li v-for="(step, index) in trail.steps" :key="step.id" :class="{ 'is-done': completed.includes(step.id), 'is-next': progress.next?.id === step.id, 'is-gap': progress.gaps.includes(step) }">
          <NuxtLink :to="trailStepUrl(trail, step)">
            <span class="trail-step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span><strong>{{ step.title }}</strong><span v-if="step.outcome" class="trail-step-outcome">{{ step.outcome }}</span></span>
            <span class="trail-step-state"><HandCheck :done="completed.includes(step.id)" :size="20" /><span class="state-text">{{ completed.includes(step.id) ? 'Concluída' : progress.next?.id === step.id ? 'próxima' : progress.gaps.includes(step) ? 'pulou' : 'A estudar' }}</span></span>
          </NuxtLink>
        </li>
      </ol>
      <p class="quiet-note" style="margin-top: 18px">Marque a etapa no fim de cada página. O progresso fica salvo neste navegador.</p>
    </section>
  </div>
</template>
