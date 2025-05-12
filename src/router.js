import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import NewSurvey from './views/NewSurvey.vue'
import Surveys from './views/Surveys.vue'
import OwnSurvey from './views/OwnSurvey.vue'
import Data from './views/Data.vue'
import ResSurvey from './views/ResSurvey.vue'
import Error from './views/Error.vue'
import Landing from './views/Landing.vue'

import SurveyorLayout from './layout/SurveyorLayout.vue'
import RespondentLayout from './layout/RespondentLayout.vue'

const routes = [
    {
        path: '/surveyor/:id',
        component: SurveyorLayout,
        children : [
            {
                path: 'home',
                name: 'surveyor-home',
                component: Home
            },
            {
                path: 'about',
                name: 'surveyor-about',
                component: About
            },
            {
                path: 'surveys',
                name: 'all-surveys',
                component: Surveys
            },
            {
                path: 'survey/:surveyId',
                name: 'survey-details',
                component: OwnSurvey,
                props: true,
                children: [
                    {
                        path: 'data',
                        name: 'survey-data',
                        component: Data,
                    }
                ]
            },
            {
                path: 'new-survey',
                name: 'create-survey',
                component: NewSurvey
            },
            {
                path: '',
                redirect: { name: 'surveyor-home'}
            }
        ]
    },
    {
        path: '/respondent/:id',
        component: RespondentLayout,
        children: [
            {
                path: 'survey/:surveyId',
                name: 'respond-to-survey',
                component: ResSurvey,
                props: true
            },
            {
                path: '',
                redirect: { name: 'respond-to-survey' }
            }
        ]
    },
    {
        path: '/',
        name: 'landing-page',
        component: Landing
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: Error
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router