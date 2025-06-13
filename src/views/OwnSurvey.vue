<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Question from '../components/Question.vue'

const route = useRoute();
const router = useRouter();

const survey = ref(null)
const loading = ref(true)
const error = ref(null)
const surveyData = ref(null)

const surveyTitle = ref("")

async function addQuestion(){
  const surveyId = survey.value.id
  loading.value = true
  error.value = null
  console.log(surveyId)
  try{
    const response = await fetch('http://localhost:3000/api/add-question', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({id: surveyId})
    })

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
    await fetchSurveyData()
  }
}

async function fetchSurveyData(){
  const data = route.params.surveyId;

  loading.value = true
  error.value = null
  try{
    const response = await fetch('http://localhost:3000/api/get-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: data})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    survey.value = await response.json()
    console.log(survey.value)
    surveyTitle.value = survey.value.title
    // survey.value = surveyData.value.find(x => x.id === route.params.surveyId)
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  }
}

async function deleteSurvey(){
  if(!confirm('Confirm you want to delete this survey?')) return

  loading.value = true
  try{
    const response = await fetch('http://localhost:3000/api/delete-survey', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: survey.value.id })
    })

    if(!response.ok){
      throw new Error('HTTP error! status: ' + response.status)
    }

    router.push('/surveyor/123/home')
  } catch (err){
    error.value = err
  } finally {
    loading.value = false
  }
}

async function updateTitle(){
  try{
    const response = await fetch('http://localhost:3000/api/update-question-name', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: survey.value.id,
        newTitle: surveyTitle.value
      })
    })
    if (!response.ok){
      throw new Error('HTTP error! status: ' + response.status)
    }
  } catch (err) {
    console.log(err)
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
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else-if="error">Error: {{ error }}</h1>
    <!-- <h1 v-else-if="survey">{{ survey.title }}</h1> -->
    <input v-else-if="survey" :value="survey.title">
    <h1 v-else>No Data</h1>
    <div v-if="survey">
      <!-- <div class="detail-container">
        <p>{{ survey.date.split('T')[0] }}</p>
        <p>{{ survey.link }}</p>
        <p>respondents: {{ survey.respondents }}</p>
        <p v-if="survey.active">active</p>
        <p v-else>unactive</p>
      </div> -->
      <p>{{ survey.description }}</p>
      <button @click="deleteSurvey" class="delete-btn">Delete</button>
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
    </div>
  </main>
</template>

<style scoped>
header{
  margin-bottom: 2rem;
}

ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0;
  padding: 0;
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
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  gap: 1rem;
}

.detail-container p{
  text-align: start;
  margin: 0;
}

main{
  margin: 0;
}

.delete-btn{
  font-family: var(--regular-font);
  padding: 0.5rem 1rem;
  color: var(--orange);
  background-color: var(--background-colour);
  border: 1px solid var(--orange);
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.delete-btn:hover{
  color: var(--background-colour);
  background-color: var(--orange);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.25rem 0 var(--text-colour);
}

.delete-btn:active{
  color: var(--orange);
  background-color: var(--background-colour);
  transform: translateY(0);
  box-shadow: 0 0 0 var(--text-colour);
}

input{
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  border: var(--border);
  border-radius: 0.25rem;
  margin-top: 1rem;
  width: 100%;
}
</style>