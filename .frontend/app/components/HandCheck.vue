<script setup lang="ts">
// A check mark that looks drawn with a pen; the stroke animates when `done` turns true.
defineProps<{ done: boolean; size?: number }>()
</script>

<template>
  <svg class="hand-check" :class="{ 'is-done': done }" :width="size || 22" :height="size || 22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path class="hand-check-box" d="M4.2 5.1c4.9-.6 10.2-.7 15.3-.2.6 4.6.5 9.4.1 14.1-4.9.5-10 .6-15.1.1-.6-4.7-.7-9.3-.3-14z" />
    <path class="hand-check-mark" d="M6.8 12.6c1.3 1.2 2.4 2.5 3.4 4 2.2-4.4 5-8.2 8.6-11.6" />
  </svg>
</template>
