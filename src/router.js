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
                component: SignIn,
                props: { mode: 'signin'}
            },
            {
                path: 'register',
                name: 'register',
                component: SignIn,
                props: { mode: 'register'}
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
                path: 'res/:surveyId',
                name: 'user-survey-response',
                component: SurveyResponse,
                props: true
            },
            {
                path: '',
                redirect: { name: 'dashboard'}
            }
        ]
    },
    {
        path: '/res/:surveyId',
        name: 'anon-survey-response',
        component: SurveyResponse,
        props: true
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