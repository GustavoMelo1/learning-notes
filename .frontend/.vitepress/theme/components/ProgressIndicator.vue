<script setup lang="ts">
defineProps<{ count: number; total: number; label: string }>()
</script>
<template>
  <div class="progress-indicator"><span>{{ count }} de {{ total }} etapas concluídas</span><progress :value="count" :max="total" :aria-label="label" /></div>
</template>
