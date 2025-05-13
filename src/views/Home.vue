<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {ref} from 'vue'
const surveyDetail = ref({
    title: "Testing Title",
    respondents: 10,
    questions: 5,
    date: "5 Jan 2025",
    active: true,
    link: "hello, world!"
}) 
</script>

<template>
    <header>
        <h1 class="page-heading">Home</h1>
        <p class="subheading">All your surveys on one page</p>
    </header>
    <div>
        <SurveyCard :survey="surveyDetail" />
        <SurveyCard :survey="surveyDetail" />
        <SurveyCard :survey="surveyDetail" />
    </div>
</template>

<style>
.page-heading{
    font-size: 4rem;
    margin: 1rem;
}

.subheading{
    font-size: 1.5rem;
}
</style>