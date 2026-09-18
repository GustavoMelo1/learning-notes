<script setup lang="ts">
import { games } from './lab-data'
</script>
<template>
  <div class="lab-table" tabindex="0" role="region" aria-label="Dados de origem: jogos">
    <table><caption>jogos · dados de origem</caption><thead><tr><th scope="col">titulo</th><th scope="col">genero</th><th scope="col">nota</th></tr></thead><tbody><tr v-for="game in games" :key="game.title"><td>{{ game.title }}</td><td>{{ game.genre }}</td><td>{{ game.score.toFixed(1) }}</td></tr></tbody></table>
  </div>
</template>
