<script setup lang="ts">
// Marca-texto: a static CSS highlight that rough-notation redraws by hand when it scrolls into view.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '~/lib/motion'

const props = withDefaults(defineProps<{ type?: 'highlight' | 'underline' | 'circle'; delay?: number }>(), { type: 'highlight', delay: 0 })
const el = ref<HTMLElement>()
const drawn = ref(false)
const pending = ref(false) // the hand-drawn version is coming, so hide the static CSS highlight
let annotation: { show(): void; remove(): void } | undefined
let io: IntersectionObserver | undefined
let themeWatcher: MutationObserver | undefined

async function draw() {
  if (!el.value) return
  annotation?.remove()
  const { annotate } = await import('rough-notation')
  const styles = getComputedStyle(el.value)
  const color = props.type === 'highlight' ? styles.getPropertyValue('--marker').trim() : styles.getPropertyValue('--red').trim()
  if (!color) return // tokens missing: keep the static CSS highlight instead of drawing in black
  annotation = annotate(el.value, {
    type: props.type, color, multiline: true, iterations: props.type === 'highlight' ? 1 : 2,
    animationDuration: 700, padding: props.type === 'circle' ? 6 : 2, strokeWidth: props.type === 'highlight' ? 1 : 2,
  })
  annotation.show()
  drawn.value = true
}

onMounted(() => {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
  pending.value = true
  io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    io?.disconnect()
    setTimeout(draw, props.delay)
  }, { threshold: 0.6 })
  io.observe(el.value!)
  // Redraw with the other theme's colour when the reader toggles light/dark.
  themeWatcher = new MutationObserver(() => { if (drawn.value) requestAnimationFrame(draw) })
  themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => { io?.disconnect(); themeWatcher?.disconnect(); annotation?.remove() })
</script>

<template><span ref="el" class="grifo" :class="[`grifo-${type}`, { 'is-pending': pending && !drawn, 'is-drawn': drawn }]"><slot /></span></template>
