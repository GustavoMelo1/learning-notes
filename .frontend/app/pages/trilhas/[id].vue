<script setup lang="ts">
import { computed } from 'vue'
import { findTrail } from '~/lib/trails'

const route = useRoute()
const trail = computed(() => findTrail(String(route.params.id)))
if (!trail.value) throw createError({ statusCode: 404, message: 'Trilha não encontrada', fatal: true })
useSeoMeta({ title: () => trail.value?.title, description: () => trail.value?.description })
</script>

<template><TrailPage v-if="trail" :trail="trail" /></template>
