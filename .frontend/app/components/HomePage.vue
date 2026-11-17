<script setup lang="ts">
import { computed } from 'vue'
import { subjects } from '~/lib/subjects'
import { resumePoint, trailStepUrl, trailUrl, trails } from '~/lib/trails'
import { useProgress } from '~/lib/progress'
import { vReveal } from '~/lib/motion'
import Grifo from './Grifo.vue'
import TrailEntry from './TrailEntry.vue'

const { completed, message } = useProgress()
const featured = trails.filter(trail => trail.kind === 'fundamentos').slice(0, 2)

// One primary action: pick up where the reader stopped, or start the first trail.
const resume = computed(() => {
  const point = resumePoint(completed.value)
  return point.started
    ? { label: `Continuar: ${point.step.title}`, detail: `Trilha de ${point.trail.short} · etapa ${point.index + 1} de ${point.trail.steps.length}`, to: trailStepUrl(point.trail, point.step) }
    : { label: `Começar pela trilha de ${point.trail.short}`, detail: `${point.trail.steps.length} etapas · ${point.trail.description}`, to: trailUrl(point.trail) }
})
</script>

<template>
  <div class="page home-page">
    <header class="home-hero">
      <div>
        <h1>Um caderno aberto de <Grifo>SQL</Grifo>, <Grifo :delay="220">Python</Grifo> e dados.</h1>
        <p class="hero-description">Anotações com as minhas palavras, exemplos que eu rodei e os erros que cometi no caminho. Consulte uma nota quando precisar ou siga uma trilha do começo.</p>
        <div class="hero-resume">
          <NuxtLink class="action primary" :to="resume.to">{{ resume.label }}</NuxtLink>
          <span class="hero-resume-detail">{{ resume.detail }}</span>
        </div>
        <div class="actions-row" style="margin-top: 14px">
          <NuxtLink class="text-link" to="/biblioteca">Explorar biblioteca</NuxtLink>
          <NuxtLink class="text-link" to="/trilhas">Ver trilhas de aprendizado</NuxtLink>
        </div>
      </div>
      <aside class="margin-note hero-margin" aria-label="Nota sobre o progresso">seu progresso fica só neste navegador. sem conta, sem cadastro.</aside>
    </header>

    <section class="section" aria-labelledby="subjects-title">
      <div class="section-heading"><h2 id="subjects-title">Sumário</h2><NuxtLink class="text-link" to="/indice">Todas as notas</NuxtLink></div>
      <ol v-reveal.stagger class="toc">
        <li v-for="(subject, index) in subjects" :key="subject.folder">
          <NuxtLink :to="subject.url">
            <span class="toc-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="toc-copy"><strong>{{ subject.name }}</strong><span>{{ subject.description }}</span></span>
          </NuxtLink>
        </li>
      </ol>
    </section>

    <section class="section" aria-labelledby="home-trails">
      <div class="section-heading"><h2 id="home-trails">Trilhas para começar</h2><NuxtLink class="text-link" to="/trilhas">Todas as trilhas</NuxtLink></div>
      <ol v-reveal.stagger class="trail-list">
        <TrailEntry v-for="(trail, index) in featured" :key="trail.id" :trail="trail" :number="index + 1" :completed="completed" />
      </ol>
      <p v-if="message" role="status" class="save-message">{{ message }}</p>
    </section>
  </div>
</template>
