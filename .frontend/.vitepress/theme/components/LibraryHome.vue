<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { subjects } from '../subjects'
import { trails, trailProgress, trailStepUrl, trailUrl } from '../trails'
import { useProgress } from '../progress'
import { vReveal } from '../motion'
import Grifo from './Grifo.vue'
import LearningPathCard from './LearningPathCard.vue'
const { completed, message } = useProgress()

// One primary action: pick up where the reader stopped, or start the first trail.
const resume = computed(() => {
  for (const trail of trails) {
    const progress = trailProgress(trail, completed.value)
    if (progress.count && progress.next) {
      const index = trail.steps.indexOf(progress.next)
      return { label: `Continuar: ${progress.next.title}`, detail: `${trail.title} · etapa ${index + 1} de ${trail.steps.length}`, href: trailStepUrl(trail, progress.next) }
    }
  }
  const first = trails[0]
  return { label: `Começar pela trilha de ${first.title.split(':')[0]}`, detail: `${first.steps.length} etapas · ${first.description}`, href: trailUrl(first) }
})
</script>

<template>
  <div class="notebook home-page">
    <header class="home-hero">
      <div class="home-hero-text">
        <h1>Um caderno aberto de <Grifo>SQL</Grifo>, <Grifo :delay="220">Python</Grifo> e dados.</h1>
        <p class="hero-description">Anotações com as minhas palavras, exemplos que eu rodei e os erros que cometi no caminho. Consulte uma nota quando precisar ou siga uma trilha do começo.</p>
        <div class="hero-resume">
          <a class="action primary-action" :href="withBase(resume.href)">{{ resume.label }}</a>
          <span class="hero-resume-detail">{{ resume.detail }}</span>
        </div>
        <div class="guide-actions secondary-actions">
          <a class="text-link" :href="withBase('/biblioteca')">Explorar biblioteca</a>
          <a class="text-link" :href="withBase('/trilhas/')">Ver trilhas de aprendizado</a>
        </div>
      </div>
      <aside class="margin-note hero-margin" aria-label="Nota sobre o progresso">
        seu progresso fica só neste navegador. sem conta, sem cadastro.
      </aside>
    </header>

    <section class="home-section" aria-labelledby="subjects-title">
      <div class="section-heading"><h2 id="subjects-title">Sumário</h2><a class="text-link" :href="withBase('/indice')">Todas as notas</a></div>
      <ol v-reveal.stagger class="toc">
        <li v-for="(subject, index) in subjects" :key="subject.name">
          <a :href="withBase(subject.url)">
            <span class="toc-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="toc-copy"><strong>{{ subject.name }}</strong><span>{{ subject.description }}</span></span>
          </a>
        </li>
      </ol>
    </section>

    <section class="home-section" aria-labelledby="home-trails">
      <div class="section-heading"><h2 id="home-trails">Trilhas para começar</h2><a class="text-link" :href="withBase('/trilhas/')">Todas as trilhas</a></div>
      <div v-reveal.stagger class="trail-grid"><LearningPathCard v-for="trail in trails" :key="trail.id" :trail="trail" :completed="completed" /></div>
      <p v-if="message" role="status" class="save-message">{{ message }}</p>
    </section>

    <aside v-reveal class="home-about">
      <div><h2>Escrito enquanto eu aprendo.</h2><p>Um projeto aberto de Gustavo Melo. Se achar um erro, ele provavelmente já está anotado em algum lugar — ou merece estar.</p></div>
      <div class="guide-actions"><a class="text-link" :href="withBase('/sobre')">Sobre o projeto</a><a class="text-link" href="https://github.com/GustavoMelo1/learning-notes">Repositório ↗</a></div>
    </aside>
  </div>
</template>
