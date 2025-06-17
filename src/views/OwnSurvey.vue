<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Question from '../components/Question.vue'
import editSvg from '../assets/pen-solid.svg?raw'

const route = useRoute();
const router = useRouter();

const survey = ref(null)
const loading = ref(true)
const error = ref(null)
const surveyData = ref(null)

const title = ref('')

const surveyTitle = ref("New Survey")
const surveyDescription = ref("Survey Description")

async function addQuestion(){
  const surveyId = survey.value.id
  loading.value = true
  error.value = null

  title.value = 'Loading...'
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
    title.value = `Error: ${err}`
  } finally {
    loading.value = false
    await fetchSurveyData()
  }
}

async function fetchSurveyData(){
  const data = route.params.surveyId;

  loading.value = true
  error.value = null
  title.value = 'Loading...'

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
    surveyDescription.value = survey.value.description
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
  title.value = 'Loading...'

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
    title.value = `Error: ${err}`
  } finally {
    loading.value = false
  }
}

async function updateTitle(){
  try{
    const response = await fetch('http://localhost:3000/api/update-survey-title', {
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

async function updateDescription(){
  try{
    const response = await fetch('http://localhost:3000/api/update-survey-desc', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: survey.value.id,
        newDesc: surveyDescription.value
      })
    })
    if (!response.ok){
      throw new Error('HTTP error! status: ' + response.status)
    }
  } catch (err) {
    console.log(err)
  }
}

function onKeyDownTitle(e) {
    if (e.key === 'Enter') {
        updateTitle()
        e.target.blur()
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
    <div class="survey-title">
      <div v-if="survey" class="title-container">
        <input 
          v-model="surveyTitle"
          @blur="updateTitle"
          @keydown="onKeyDownTitle">
        <div class="svg" v-html="editSvg"></div>
      </div>
      <h1 v-else="loading || error">{{ title }}</h1>
    </div>
    <div v-if="survey" class="survey-details">
      <textarea 
        name="surveyDesc" 
        id=""
        v-model="surveyDescription"
        @blur="updateDescription">
      </textarea>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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

.survey-details{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  padding-top: 1rem;
  gap: 1rem;
}

input{
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  border: none;
  width: 100%;
}

textarea{
  box-sizing: border-box;
  font-family: var(--regular-font);
  font-size: 1rem;
  background-color: var(--background-colour);
  color: var(--text-colour);
  border: var(--border);
  border-radius: 0.25rem;
  width: 100%;
  resize: none;
  padding: 0.5rem;
  field-sizing: content;
}

.svg{
  width: 0;
  height: 1.75rem;
  color: var(--text-colour);
  opacity: 0;
  transition: all 0.2s;
}

.survey-title{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.title-container:hover .svg,
.title-container input:focus + .svg {
  width: 1.75rem;
  opacity: 1;
}

.svg svg{
  fill: currentColor;
  stroke: currentColor;
}
</style>