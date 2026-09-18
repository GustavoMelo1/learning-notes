import DefaultTheme from 'vitepress/theme'
import LibraryHome from './components/LibraryHome.vue'
import LibraryCatalog from './components/LibraryCatalog.vue'
import JoinLab from './components/JoinLab.vue'
import QueryLab from './components/QueryLab.vue'
import GroupLab from './components/GroupLab.vue'
import DecisionLab from './components/DecisionLab.vue'
import ListLab from './components/ListLab.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LibraryHome', LibraryHome)
    app.component('LibraryCatalog', LibraryCatalog)
    app.component('JoinLab', JoinLab)
    app.component('QueryLab', QueryLab)
    app.component('GroupLab', GroupLab)
    app.component('DecisionLab', DecisionLab)
    app.component('ListLab', ListLab)
  },
}
