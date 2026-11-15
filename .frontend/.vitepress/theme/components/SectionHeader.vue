<script setup lang="ts">
defineProps<{ id: string; title: string; eyebrow?: string }>()
</script>
<template><div class="section-heading"><div><p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p><h2 :id="id">{{ title }}</h2></div><slot /></div></template>
