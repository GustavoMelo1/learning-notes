<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{ file: string }>()
</script>
<template><a :href="withBase(`/exercicios/${file}`)" download data-vp-ignore><slot /></a></template>
