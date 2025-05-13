<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {ref} from 'vue'
const surveyDetail = ref({
    title: "Testing Title",
    respondents: 10,
    questions: 5,
    date: "5 Jan 2025",
    active: true
}) 
</script>

<template>
    <h1>Surveyor Home Page</h1>
    <p>this shows all the surveys that the surveyor has previously made</p>
    <div>
        <SurveyCard :survey="surveyDetail" />
        <SurveyCard :survey="surveyDetail" />
        <SurveyCard :survey="surveyDetail" />
    </div>
</template>

<style>
</style>