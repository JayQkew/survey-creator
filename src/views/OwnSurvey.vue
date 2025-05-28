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

function addQuestion(){
  const newId = Date.now()
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
  postData();
}

async function fetchData(){
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
    // survey.value = surveyData.value.find(x => x.id === route.params.surveyId)
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  }
}

async function postData(){
  loading.value = true
  try{
    const response = await fetch('http://localhost:3000/api/update-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(survey.value)
    })

    if(!response.ok){
      throw new Error(`HTTP error, status: ${response.status}`)
    }
  } catch (error){
    error.value = error
  } finally {
    loading.value = false
    fetchData()
  }
}

async function deleteQuestion(){
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

onMounted(() => {
  fetchData()
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
        <p>{{ survey.date.split('T')[0] }}</p>
        <p>respondents: {{ survey.respondents }}</p>
        <p>{{ survey.link }}</p>
        <p v-if="survey.active">active</p>
        <p v-else>unactive</p>
      </div>
      <p>{{ survey.description }}</p>
      <button @click="deleteQuestion">Delete</button>
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