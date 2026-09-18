<script setup lang="ts">
import { withBase } from 'vitepress'
const subjects = [
  { name: 'SQL', description: 'Consultas e bancos relacionais', url: '/sql/09-select', symbol: '01' },
  { name: 'Python', description: 'Lógica e fundamentos da linguagem', url: '/python/code/00-typevariables', symbol: '02' },
  { name: 'BI', description: 'Modelagem e análise de dados', url: '/bi/docs', symbol: '03' },
  { name: 'Engenharia de Dados', description: 'Dos dados à informação', url: '/data-engineering/business-intelligence', symbol: '04' },
  { name: 'MongoDB', description: 'Documentos e bancos NoSQL', url: '/mongodb/notes', symbol: '05' },
]
</script>

<template>
  <main class="notebook home-simple">
    <header class="intro">
      <p class="eyebrow">Gustavo Melo / Caderno aberto</p>
      <h1>Aprender. Testar.<br><span>Anotar o caminho.</span></h1>
      <p class="intro-copy">Minhas anotações sobre programação e dados.<br>Testadas por mim, erradas por mim primeiro.</p>
      <div class="home-actions"><a class="action primary" :href="withBase('/biblioteca')">Explorar a biblioteca <span aria-hidden="true">→</span></a></div>
    </header>
    <section id="biblioteca" aria-label="Escolha um assunto" class="subject-list">
      <a v-for="subject in subjects" :key="subject.url" :href="withBase(subject.url)">
        <span class="subject-number" aria-hidden="true">{{ subject.symbol }}</span>
        <span><strong>{{ subject.name }}</strong><small>{{ subject.description }}</small></span>
        <span class="subject-arrow" aria-hidden="true">↗</span>
      </a>
    </section>
    <p class="home-footnote">Aprende melhor testando? <a :href="withBase('/sql/26-join#join-lab-title')">Experimenta o laboratório de JOIN →</a></p>
  </main>
</template>
