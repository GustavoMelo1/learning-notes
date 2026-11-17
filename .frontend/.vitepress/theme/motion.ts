import type { Directive } from 'vue'

/** True when the visitor asked the system for less motion (or when there is no window, e.g. SSR/tests). */
export function prefersReducedMotion() {
  return typeof window === 'undefined' || !window.matchMedia
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let observer: IntersectionObserver | undefined
function revealObserver() {
  observer ??= new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-revealed')
      observer!.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  return observer
}

/**
 * v-reveal: the element (or each direct child, with v-reveal.stagger) eases in when it enters the viewport.
 * Content is never hidden on the server or without IntersectionObserver, so nothing depends on JS to be read.
 */
export const vReveal: Directive<HTMLElement> = {
  mounted(el, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const targets = binding.modifiers.stagger ? [...el.children] as HTMLElement[] : [el]
    targets.forEach((target, index) => {
      target.style.setProperty('--reveal-index', String(Math.min(index, 8)))
      target.classList.add('reveal')
      revealObserver().observe(target)
    })
  },
  unmounted(el, binding) {
    const targets = binding.modifiers.stagger ? [...el.children] : [el]
    targets.forEach(target => observer?.unobserve(target))
  },
}

/** Small burst of paper-coloured confetti from an element, used when a step is marked as done. */
export async function celebrate(from?: Element | null, big = false) {
  if (prefersReducedMotion()) return
  const { default: confetti } = await import('canvas-confetti')
  const rect = from?.getBoundingClientRect()
  const origin = rect
    ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
    : { x: 0.5, y: 0.6 }
  confetti({
    particleCount: big ? 140 : 46, spread: big ? 100 : 62, startVelocity: big ? 42 : 30,
    gravity: 1.1, scalar: 0.85, ticks: 160, origin,
    colors: ['#ffd43b', '#2b4acb', '#c8402e', '#f1ebdd'], disableForReducedMotion: true,
  })
}
