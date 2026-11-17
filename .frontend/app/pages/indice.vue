<script setup lang="ts">
import { computed } from 'vue'
import { subjects } from '~/lib/subjects'

const notes = useNotes()
const groups = computed(() => subjects.map(subject => ({ ...subject, notes: notes.value.filter(note => note.folder === subject.folder) })))
useSeoMeta({ title: 'Todas as notas', description: 'Índice completo do Learning Notes, organizado por assunto e sem paginação.' })
</script>

<template>
  <div class="page full-index">
    <header class="page-heading">
      <h1>Todas as notas</h1>
      <p>{{ notes.length }} notas em {{ groups.length }} assuntos. Esta lista é completa, sem filtros nem paginação. Prefere buscar? <NuxtLink to="/biblioteca">Abra a biblioteca</NuxtLink>.</p>
    </header>
    <nav class="index-subjects" aria-label="Ir para um assunto">
      <a v-for="group in groups" :key="group.folder" :href="`#${group.folder}`">{{ group.name }} ({{ group.notes.length }})</a>
    </nav>
    <section v-for="group in groups" :key="group.folder" class="index-section" :aria-labelledby="group.folder">
      <h2 :id="group.folder">{{ group.name }}<small>{{ group.notes.length }} notas</small></h2>
      <ul>
        <li v-for="note in group.notes" :key="note.url"><NuxtLink class="index-note" :to="note.url">{{ note.label }}<span>{{ note.kind }}</span></NuxtLink></li>
      </ul>
    </section>
  </div>
</template>
