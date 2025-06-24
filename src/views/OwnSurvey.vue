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

// async function addQuestion(){
//   const surveyId = survey.value.id
//   loading.value = true
//   error.value = null

//   title.value = 'Loading...'
//   console.log(surveyId)
//   try{
//     const response = await fetch('http://localhost:3000/api/add-question', {
//       method: 'POST',
//       headers: { 'Content-Type' : 'application/json' },
//       body: JSON.stringify({id: surveyId})
//     })

//     if(!response.ok){
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//   } catch (err) {
//     error.value = err
//     title.value = `Error: ${err}`
//   } finally {
//     loading.value = false
//     await fetchSurveyData()
//   }
// }

function addQuestion(){
  const now = new Date()
  const baseQuestion = {
    id: now.toString(),
    survey_id: survey.value.id,
    question_text: '',
    public_responses: 0,
    type: 'single',
    type_detail: JSON.stringify({
      options: []
    })
  }

  survey.value.questions.push(baseQuestion)
  console.log(survey.value)
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
  survey.value.title = surveyTitle.value;
  console.log(survey.value)
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
  <header class="flex-ctr-c">
    <nav class="flex-ctr-r">
        <router-link >Edit</router-link>
        <router-link >Responses</router-link>
        <router-link >Share</router-link>
        <router-link >Delete</router-link>
    </nav>
    <div class="survey-title flex-ctr-r">
      <div v-if="survey" class="title-container flex-ctr-r">
        <input 
          class="text-input tc-i no-border-i xlfs-i"
          v-model="surveyTitle"
          @blur="updateTitle"
          @keydown="onKeyDownTitle">
        <div class="svg" v-html="editSvg"></div>
      </div>
      <h1 v-else="loading || error">{{ title }}</h1>
    </div>
    <div v-if="survey" class="survey-details flex-ctr-c">
      <textarea 
        name="surveyDesc" 
        id=""
        v-model="surveyDescription"
        @blur="updateDescription">
      </textarea>
      <button 
        class="accent-btn rc-btn sp-btn mfs-btn" 
        @click="deleteSurvey">
        Delete
      </button>
    </div>
  </header>
  <main>
    <ul v-if="survey" class="flex-ctr-c">
      <Question 
        v-for="question in survey.questions" 
        :key="question.id" 
        :qID="question.id"/>
    </ul>
    <div class="btn-container flex-ctr-r">
      <button type="button" class="style-btn add-btn" @click="addQuestion">+</button>
    </div>
  </main>
</template>

<style scoped>
header{
  margin-bottom: 2rem;
  box-sizing: border-box;
}

ul{
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.add-btn{
  font-family: 'Ubuntu Bold';
  font-size: x-large;
  margin-top: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  padding: 0;
  text-align: center;
}

.btn-container{
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

.survey-details{
  box-sizing: border-box;
  width: 100%;
  padding-top: 1rem;
  gap: 1rem;
}

input{
  font-weight: bold;
  text-align: center;
}

textarea{
  box-sizing: border-box;
  font-family: var(--regular-font);
  font-size: medium;
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
  transition: var(--transition);
}

.survey-title{
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
}

.title-container {
  gap: 1rem;
  width: 100%;
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

nav{
  gap: 0.5rem;
  background-color: var(--text-colour);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-block: 1rem
}

nav a{
  background-color: var(--text-colour);
  font-weight: bold;
  color: var(--background-colour);
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--text-colour);
  border-radius: 0.25rem;  
  transition: var(--transition);
}

nav a:hover{
  background-color: var(--background-colour);
  color: var(--text-colour);
}
</style>