<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import surveyData from '../survey-data.json'
import Question from '../components/Question.vue'

const route = useRoute();

const survey = ref(null)
const loading = ref(true)
const error = ref(null)

function addQuestion(){
  // generate new id 
  const newId = 'q_' + Date.now()
  survey.value['questions'].push({
      id: newId,
      question: "",
      type: "",
      typeDetail: [],
      responses: [],
      publicResponses: false
  })
}

function saveSurvey(){
  console.log(survey.value['questions'])
}

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

provide('survey', {
  survey
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
      <Question 
        v-for="question in survey.questions" 
        :key="question.id" 
        :qID="question.id"/>
    </ul>
    <div class="btn-container">
      <button type="button" class="style-btn add-btn" @click="addQuestion">+</button>
      <button type="button" class="style-btn save-btn" @click="saveSurvey">Save</button>
    </div>
  </main>
</template>

<style scoped>
ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.add-btn{
  font-family: 'Ubuntu Bold';
  font-size: 1.5rem;
  margin-top: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  padding: 0;
  text-align: center;
}

.save-btn{
  font-family: 'Ubuntu Bold';
  font-size: 1.5rem;
  margin-top: 0.5rem;
  height: 2.5rem;
  border-radius: 100vw;
  padding-inline: 1rem;
  text-align: center;
}

.btn-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.detail-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>