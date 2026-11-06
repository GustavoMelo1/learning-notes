<script setup lang="ts">
import { withBase } from 'vitepress'
import { paths } from '../paths'
import { useProgress } from '../progress'
const { completed, message } = useProgress()
</script>

<template>
  <div class="notebook practice-page">
    <header class="page-heading">
      <p class="eyebrow">Aprender fazendo</p><h1>Projetos, por dentro.</h1>
      <p>O caminho entre ler sobre um conceito e usar de verdade. Meus experimentos, organizados em etapas para tu acompanhar.</p>
    </header>
    <p class="quiet-note">Três percursos, dois projetos de origem. Os repositórios continuam como estão; aqui entram as explicações, exercícios e dados fictícios.</p>
    <p v-if="message" role="status" class="save-message">{{ message }}</p>
    <div class="path-list">
      <section v-for="(path, index) in paths" :key="path.id" class="path-section" :aria-labelledby="`path-${path.id}`">
        <div class="path-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="path-content">
          <p class="eyebrow">{{ path.subject }}</p>
          <h2 :id="`path-${path.id}`">{{ path.title }}</h2><p>{{ path.description }}</p>
          <p class="path-prerequisite">Antes de começar: {{ path.prerequisite }}.</p>
          <ol class="path-steps">
            <li v-for="(step, stepIndex) in path.steps" :key="step.url">
              <a :href="withBase(step.url)"><span class="step-number">{{ stepIndex + 1 }}</span><span>{{ step.title }}</span><span v-if="completed.includes(step.url)" class="step-status">Estudada</span><span v-else aria-hidden="true" class="step-arrow">→</span></a>
            </li>
          </ol>
          <div class="path-meta"><span>{{ path.steps.filter(step => completed.includes(step.url)).length }} de {{ path.steps.length }} estudadas</span><a :href="path.sourceUrl">Código de origem ↗</a></div>
        </div>
      </section>
    </div>
    <p class="quiet-note">O progresso fica neste navegador, sem conta. Marcar uma etapa é opcional.</p>
  </div>
</template>
