<script setup lang="ts">
import { withBase } from 'vitepress'
import { subjects } from '../subjects'
import { trails } from '../trails'
import { useProgress } from '../progress'
import SectionHeader from './SectionHeader.vue'
import LearningPathCard from './LearningPathCard.vue'
const { completed, message } = useProgress()
</script>

<template>
  <div class="notebook home-page">
    <header class="home-hero"><p class="eyebrow">Learning Notes</p><h1>Aprenda tecnologia,<br>um conceito de cada vez.</h1><p class="hero-description">Uma biblioteca aberta de conhecimentos em programação, desenvolvimento e tecnologia. Explore conteúdos, siga trilhas e aprenda no seu ritmo.</p><div class="guide-actions"><a class="action primary-action" :href="withBase('/biblioteca')">Explorar biblioteca <span aria-hidden="true">→</span></a><a class="action" :href="withBase('/trilhas/')">Ver trilhas de aprendizado</a></div></header>
    <section class="home-section" aria-labelledby="subjects-title"><SectionHeader id="subjects-title" title="Encontre seu assunto" eyebrow="Biblioteca aberta"><a class="text-link" :href="withBase('/indice')">Todas as notas →</a></SectionHeader><div class="subject-index"><a v-for="subject in subjects" :key="subject.name" :href="withBase(subject.url)"><strong>{{ subject.name }}</strong><span>{{ subject.description }}</span><span aria-hidden="true">→</span></a></div></section>
    <section class="home-section" aria-labelledby="home-trails"><SectionHeader id="home-trails" title="Um caminho para começar" eyebrow="Trilhas de aprendizado"><a class="text-link" :href="withBase('/trilhas/')">Ver trilhas →</a></SectionHeader><div class="trail-grid"><LearningPathCard v-for="trail in trails" :key="trail.id" :trail="trail" :completed="completed" /></div><p v-if="message" role="status" class="save-message">{{ message }}</p></section>
    <section class="home-section" aria-labelledby="how-title"><SectionHeader id="how-title" title="Aprenda no seu ritmo" /><ol class="how-it-works"><li><span>01</span><h3>Escolha um assunto</h3><p>Consulte uma nota ou siga uma trilha desde os fundamentos.</p></li><li><span>02</span><h3>Leia e experimente</h3><p>Use as explicações e os exemplos dos conteúdos para praticar.</p></li><li><span>03</span><h3>Continue de onde parou</h3><p>Marque as etapas estudadas. O progresso fica no seu navegador.</p></li></ol></section>
    <aside class="home-about"><div><h2>Conhecimento para compartilhar.</h2><p>Um projeto aberto, criado por Gustavo Melo, que cresce junto com o aprendizado.</p></div><div class="guide-actions"><a class="text-link" :href="withBase('/sobre')">Sobre e documentação →</a><a class="text-link" href="https://github.com/GustavoMelo1/learning-notes">Repositório ↗</a></div></aside>
  </div>
</template>
