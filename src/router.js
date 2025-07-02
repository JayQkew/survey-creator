import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import SurveyEdit from './views/SurveyEdit.vue'
import SurveyData from './views/SurveyData.vue'
import SurveyResponse from './views/SurveyResponse.vue'
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
                        component: About,
                    },
                    {
                        path: 'survey/:surveyId',
                        name: 'survey-edit',
                        component: SurveyEdit,
                    },
                    {
                        path: 'survey/:surveyId/data',
                        name: 'survey-data',
                        component: SurveyData,
                    },
                    {
                        path: '',
                        redirect: { name: 'surveyor-home'}
                    }
                ]
            },
            {
                path: '/res/:surveyId',
                name: 'respondent',
                component: SurveyResponse,
                props: true
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