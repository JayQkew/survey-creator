<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import surveyData from '../survey-data.json'
const route = useRoute();

const data = ref(null)
const loading = ref(true)
const error = ref(null)

const survey = ref(null)

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
    <h1>Owner Survey: {{ $route.params.surveyId }}</h1>
    <p>Where the Owner views data, adds questions, & edits the survey</p>
  </header>
  <main>
    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="data">
        <h2 v-if="survey">{{ survey.title }}</h2>
        <p>Data: {{ survey.title }}</p>
    </div>
    <div v-else>
        No data available
    </div>
  </main>
</template>

<style></style>