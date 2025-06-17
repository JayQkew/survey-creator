<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

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
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSurveyData()
})
</script>

<template>
    <h1 v-if="survey">{{ survey.title }}</h1>
    <p v-if="survey">{{ survey.description }}</p>
</template>

<style>
</style>