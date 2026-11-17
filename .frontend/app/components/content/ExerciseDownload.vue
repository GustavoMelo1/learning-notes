<script setup lang="ts">
// Download links bypass the router: the file is served as-is from /public/exercicios.
import { computed } from 'vue'
import { useRuntimeConfig } from '#imports'
const props = defineProps<{ file: string }>()
const href = computed(() => `${useRuntimeConfig().app.baseURL}exercicios/${props.file}`)
</script>
<template><a class="download-link" :href="href" download><slot /></a></template>
