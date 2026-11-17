import { ref } from 'vue'

/** Small app-wide UI state shared by the header, the search palette and the reading layout. */
export const searchOpen = ref(false)
export const menuOpen = ref(false)
export const sidebarOpen = ref(false)

export const themeKey = 'vitepress-theme-appearance'

export function setTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  try { localStorage.setItem(themeKey, dark ? 'dark' : 'light') } catch { /* storage blocked: the choice lasts this visit */ }
}
