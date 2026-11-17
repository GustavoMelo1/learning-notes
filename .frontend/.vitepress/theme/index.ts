import DefaultTheme from 'vitepress/theme'
import StudyLayout from './components/StudyLayout.vue'
import ExerciseDownload from './components/ExerciseDownload.vue'
import PracticePaths from './components/PracticePaths.vue'
import LibraryHome from './components/LibraryHome.vue'
import LibraryCatalog from './components/LibraryCatalog.vue'
import LibraryIndex from './components/LibraryIndex.vue'
import LearningTrails from './components/LearningTrails.vue'
import LearningTrail from './components/LearningTrail.vue'
import { syncTrailLocation } from './trail-context'
import JoinLab from './components/JoinLab.vue'
import QueryLab from './components/QueryLab.vue'
import GroupLab from './components/GroupLab.vue'
import DecisionLab from './components/DecisionLab.vue'
import ListLab from './components/ListLab.vue'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/source-serif-4/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import '@fontsource/caveat/500.css'
import './style.css'
import './notebook.css'

export default {
  extends: DefaultTheme,
  Layout: StudyLayout,
  enhanceApp({ app, router }) {
    router.onAfterRouteChange = href => syncTrailLocation(href)
    app.component('LibraryHome', LibraryHome)
    app.component('ExerciseDownload', ExerciseDownload)
    app.component('PracticePaths', PracticePaths)
    app.component('LibraryCatalog', LibraryCatalog)
    app.component('LibraryIndex', LibraryIndex)
    app.component('LearningTrails', LearningTrails)
    app.component('LearningTrail', LearningTrail)
    app.component('JoinLab', JoinLab)
    app.component('QueryLab', QueryLab)
    app.component('GroupLab', GroupLab)
    app.component('DecisionLab', DecisionLab)
    app.component('ListLab', ListLab)
  },
}
