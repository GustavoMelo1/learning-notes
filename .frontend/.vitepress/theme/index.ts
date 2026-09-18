import DefaultTheme from 'vitepress/theme'
import LibraryHome from './components/LibraryHome.vue'
import LibraryCatalog from './components/LibraryCatalog.vue'
import JoinLab from './components/JoinLab.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LibraryHome', LibraryHome)
    app.component('LibraryCatalog', LibraryCatalog)
    app.component('JoinLab', JoinLab)
  },
}
