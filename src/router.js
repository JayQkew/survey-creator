import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import NewSurvey from './views/NewSurvey.vue'
import Surveys from './views/Surveys.vue'
import OwnSurvey from './views/OwnSurvey.vue'
import Data from './views/Data.vue'
import ResSurvey from './views/ResSurvey.vue'

import Navbar from './components/Navbar.vue'

const routes = [
    { path: '/surveyor/home', component: Home},
    { path: '/surveyor/about', component: About},
    { path: '/surveyor/all-surveys', component: Surveys},
    { path: '/surveyor/survey', component: OwnSurvey},
    { path: '/surveyor/survey/data', component: Data},
    { path: '/surveyor/new-survey', component: NewSurvey},
    { path: '/respondant/survey', component: ResSurvey},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router