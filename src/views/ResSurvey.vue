<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import Question from '../components/Question.vue'

const route = useRoute()

const questions = ref(null)
const survey = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchSurveyData(){
    const data = route.params.surveyId

    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/get-survey', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: data})
        })

        if(!response.ok){
            throw new Error('HTTPS error! status: '+ response.status)
        }

        survey.value = await response.json()
        // console.log(survey.value)
        questions.value = survey.value.questions
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSurveyData()
})

provide('survey', {
    survey
})
</script>

<template>
    <header>
        <h1 v-if="survey">{{ survey.title }}</h1>
        <p v-if="survey">{{ survey.description }}</p>
    </header>
    <main>
        <ul v-if="survey">
            <Question
                v-for="question in survey.questions"
                :key="question.id"
                :qID="question.id"/>
        </ul>
    </main>
</template>

<style>
</style>