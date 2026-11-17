<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ count: number; total: number; label: string }>()
const percent = computed(() => props.total ? Math.round(props.count / props.total * 100) : 0)
</script>
<template>
  <div class="progress-indicator" :style="{ '--progress': `${percent}%` }">
    <span>{{ count }} de {{ total }} etapas concluídas</span>
    <!-- The native element keeps the semantics; the drawn line on top is decoration. -->
    <span class="progress-track"><progress :value="count" :max="total" :aria-label="label" /><span class="progress-ink" aria-hidden="true" /></span>
  </div>
</template>
