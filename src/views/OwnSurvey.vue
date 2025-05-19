<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import surveyData from '../survey-data.json'
import Question from '../components/Question.vue'

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
      <div class="detail-container">
        <p>{{ survey.date }}</p>
        <p>respondents: {{ survey.respondents }}</p>
        <p>{{ survey.link }}</p>
        <p v-if="survey.active">active</p>
        <p v-else>unactive</p>
      </div>
      <p>{{ survey.description }}</p>
    </div>
  </header>
  <main>
    <ul v-if="survey">
      <Question v-for="question in survey.questions" :key="question.id" :q="question"/>
    </ul>
  </main>
</template>

<style scoped>
ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--dark);
  border-radius: 1.5rem;
  padding: 0.5rem;
  gap: 0.5rem;
  margin: 0;
}

.detail-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>