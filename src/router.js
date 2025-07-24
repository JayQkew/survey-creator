import { createRouter, createWebHistory } from 'vue-router'

import Landing from './views/Landing.vue'
import SignIn from './views/SignIn.vue'
import Browse from './views/Browse.vue'
import Leaderboard from './views/Leaderboard.vue'
import ContactUs from './views/ContactUs.vue'
import AboutUs from './views/AboutUs.vue'

import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
import SurveyEdit from './views/SurveyEdit.vue'
import SurveyData from './views/SurveyData.vue'

import SurveyResponse from './views/SurveyResponse.vue'

import Error from './views/Error.vue'

import EmptyLayout from './layout/EmptyLayout.vue'
import PageLayout from './layout/PageLayout.vue'

const routes = [
    {
        path: '/',
        component: PageLayout,
        children: [
            {
                path: '',
                name: 'landing',
                component: Landing
            },
            {
                path: 'signin',
                name: 'sign-in',
                component: SignIn
            },
            {
                path: 'browse',
                name: 'browse',
                component: Browse
            },
            {
                path: 'leaderboard',
                name: 'leaderboard',
                component: Leaderboard
            },
            {
                path: 'contactus',
                name: 'contact-us',
                component: ContactUs
            },
            {
                path: 'aboutus',
                name: 'about-us',
                component: AboutUs,
            },
            {
                path: 'res/:surveyId',
                name: 'respondent',
                component: SurveyResponse,
                props: true
            }
        ]
    },
    {
        path: '/user/:id',
        component: PageLayout,
        props: true,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'surveys',
                name: 'surveys',
                component: Home
            },
            {
                path: 'survey/:surveyId',
                name: 'survey-edit',
                component: SurveyEdit
            },
            {
                path: 'survey/:surveyId/data',
                name: 'survey-data',
                component: SurveyData
            },
            {
                path: '',
                redirect: { name: 'dashboard'}
            }
        ]
    },
    {
        path: '/surveyor/:id',
        component: PageLayout,
        props: true,
        children : [
            {
                path: 'home',
                name: 'surveyor-home',
                component: Home
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