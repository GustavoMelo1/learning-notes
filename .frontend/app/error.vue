<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const missing = props.error.statusCode === 404
useSeoMeta({ title: missing ? 'Página não encontrada' : 'Algo deu errado', robots: 'noindex' })
</script>

<template>
  <div>
    <SiteHeader />
    <main id="conteudo" class="missing-page">
      <p class="margin-note" style="display: inline-block">{{ missing ? 'página arrancada do caderno?' : 'ops.' }}</p>
      <h1>{{ missing ? 'Essa anotação não está aqui.' : 'Algo deu errado ao abrir esta página.' }}</h1>
      <p>{{ missing ? 'O endereço pode ter mudado. A biblioteca é um bom lugar para procurar.' : 'Tente recarregar. Se continuar, a biblioteca segue aberta.' }}</p>
      <div class="actions-row" style="margin-top: 28px">
        <NuxtLink class="action primary" to="/biblioteca">Buscar na biblioteca</NuxtLink>
        <NuxtLink class="text-link" to="/">Voltar ao início</NuxtLink>
      </div>
    </main>
    <SiteFooter />
    <ClientOnly><SearchPalette /></ClientOnly>
  </div>
</template>
