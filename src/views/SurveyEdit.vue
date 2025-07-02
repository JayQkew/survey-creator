<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Question from '../components/Question.vue'
import editSvg from '../assets/pen-solid.svg?raw'
import SurveyNav from '../components/SurveyNav.vue'

const route = useRoute();
const router = useRouter();

const survey = ref(null)
const loading = ref(true)
const error = ref(null)
const title = ref('')

const surveyTitle = ref("New Survey")
const surveyDescription = ref("Survey Description")

const props = defineProps({
  id: String,
  surveyId: String
})

async function fetchSurvey(){
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
      body: JSON.stringify({survey_id: data})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    survey.value = await response.json()
    surveyTitle.value = survey.value.title
    surveyDescription.value = survey.value.description

    fetchQuestions()
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  }
}

async function fetchQuestions(){
  const data = route.params.surveyId;

  loading.value = true
  error.value = null
  title.value = 'Loading...'

  try{
    const response = await fetch('http://localhost:3000/api/get-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({survey_id: data})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const questions = await response.json()
    survey.value.questions = questions
    questions.map((q, i) => {
      fetchAnswers(q.id, i)
    })
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  } 
}

async function fetchAnswers(qId, qIndex){
  loading.value = true
  error.value = null
  title.value = 'Loading...'

  try{
    const response = await fetch('http://localhost:3000/api/get-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question_id: qId})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const answers = await response.json()
    survey.value.questions[qIndex].answers = answers
    console.log(survey.value)
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

    router.push('/surveyor/1/home')
  } catch (err){
    error.value = err
    title.value = `Error: ${err}`
  } finally {
    loading.value = false
  }
}

async function updateSurvey(){
  loading.value = true
  error.value = null
  console.log(survey.value)

  try{
    const response = await fetch('http://localhost:3000/api/update-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({survey: survey.value})
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    survey.value = await response.json()
    surveyTitle.value = survey.value.title
    surveyDescription.value = survey.value.description
  } catch (err) {
    error.value = err
  } finally{
    loading.value = false
  }
}

async function updateQuestions(){
  loading.value = true
  error.value = null

  try{
    const response = await fetch('http://localhost:3000/api/update-questions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        updatedQuestions: survey.value.questions,
        survey_id: survey.value.id
      })
    })

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const questions = await response.json()
    survey.value = {
      ...survey.value,
      questions: questions
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

async function updateAnswers(){
  loading.value = true
  error.value = null
  try{
    const response = await fetch('http://localhost:3000/api/update-answers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: 1,
        survey_id: survey.value.id,
        question_id: 1,
        new_answers: []
      })
    })

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

async function saveBtn(){
  updateSurvey()
  updateQuestions()
}

function addQuestion(){
  const now = new Date()
  const baseQuestion = {
    id: now.toString(),
    survey_id: survey.value.id,
    text: '',
    public_responses: 0,
    type: 'single',
    type_detail: JSON.stringify({
      options: []
    })
  }

  survey.value.questions.push(baseQuestion)
  console.log(survey.value)
}

function updateTitle(){
  survey.value.title = surveyTitle.value;
  console.log(survey.value)
}

function updateDescription(){
  survey.value.description = surveyDescription.value;
  console.log(survey.value)
}

function onKeyDownTitle(e) {
    if (e.key === 'Enter') {
        e.target.blur()
    }
}

onMounted(fetchSurvey)

provide('survey', {
  survey
})
</script>

<template>
  <header class="flex-ctr-c">
    <SurveyNav/>
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
      <div class="flex-ctr-r btn-container">
        <button 
          class="accent-btn rc-btn sp-btn mfs-btn" 
          @click="deleteSurvey">
          Delete
        </button>
        <button
          class="accent-btn gc-btn sp-btn mfs-btn"
          @click="saveBtn">
          Save
        </button>
      </div>
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
      <button type="button" class="accent-btn sa-btn tc-btn .lp-btn lfs-btn add-btn" @click="addQuestion">+</button>
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

.btn-container{
  margin-top: 1rem;
  gap: 1rem;
}

.add-btn{
  width: 100%;
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
</style>