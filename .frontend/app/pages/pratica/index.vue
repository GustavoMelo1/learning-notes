<script setup lang="ts">
// "Guias" became "Projetos aplicados" inside Trilhas. Old links land here and move on.
useSeoMeta({ title: 'Projetos aplicados', robots: 'noindex' })
useHead({ meta: [{ 'http-equiv': 'refresh', content: `0; url=${useRuntimeConfig().app.baseURL}trilhas#projetos` }] })
onMounted(() => navigateTo('/trilhas#projetos', { replace: true }))
</script>

<template>
  <div class="missing-page">
    <h1>Os guias agora são projetos aplicados.</h1>
    <p>Eles fazem parte das trilhas. <NuxtLink to="/trilhas#projetos">Ir para os projetos aplicados</NuxtLink>.</p>
  </div>
</template>
