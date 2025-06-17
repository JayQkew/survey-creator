import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import OwnSurvey from './views/OwnSurvey.vue'
import Data from './views/Data.vue'
import ResSurvey from './views/ResSurvey.vue'
import Error from './views/Error.vue'
import Landing from './views/Landing.vue'

import EmptyLayout from './layout/EmptyLayout.vue'
import PageLayout from './layout/PageLayout.vue'
import SignIn from './views/SignIn.vue'

const routes = [
    {
        path: '',
        component: PageLayout,
        children: [
            {
                path: '',
                name: 'landing-page',
                component: Landing
            },
            {
                path: 'sign-in',
                name: 'sign-in-page',
                component: SignIn
            },
            {
                path: 'surveyor/:id',
                component: EmptyLayout,
                props: true,
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
                        path: '',
                        redirect: { name: 'surveyor-home'}
                    }
                ]
            },
            {
                path: '/respondent/:id',
                component: EmptyLayout,
                props: true,
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
            }
        ]
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