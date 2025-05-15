<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import surveyData from '../survey-data.json'
import SurveyQuestions from '../components/SurveyQuestion.vue'
const route = useRoute();

const survey = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  try {
    survey.value = surveyData.find(x => x.id === route.params.surveyId)
  } catch (err) {
    error.value = `Failed to load data: ${err.message}`
    console.error('Error loading survey data:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <header>
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else-if="error">Error: {{ error }}</h1>
    <h1 v-else-if="survey">{{ survey.title }}</h1>
    <h1 v-else>No Data</h1>
    <div v-if="survey">
      <p>{{ survey.date }}</p>
      <p>{{ survey.link }}</p>
      <p v-if="survey.active">active</p>
      <p v-else>unactive</p>
      <p>{{ survey.description }}</p>
      <p>respondents: {{ survey.respondents }}</p>
    </div>
    <!-- <p>Where the Owner views data, adds questions, & edits the survey</p> -->
  </header>
  <main>
    <ul v-if="survey">
      <SurveyQuestions v-for="(i, index) in survey.questions" :key="index" :question="i"/>
    </ul>
  </main>
</template>

<style></style>