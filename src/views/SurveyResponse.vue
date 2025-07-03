<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import Question from '../components/Question.vue'

const route = useRoute()

const responses = ref([])
const survey = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchSurvey(){
    const data = route.params.surveyId

    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/get-survey', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({survey_id: data})
        })

        if(!response.ok){
            throw new Error('HTTPS error! status: '+ response.status)
        }

        survey.value = await response.json()
        fetchQuestions()
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

async function fetchQuestions(){
  const data = route.params.surveyId;

  loading.value = true
  error.value = null

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
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  } 
}

async function submitResponse(){
    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/sumbit-responses', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({responses: responses.value})
        })

        if(!response.ok){
            throw new Error('HTTPS error! Status: ' + response.status)
        }

        const data = await response.json()
        console.log(data.message)
    } catch (err) {
        error.value = err
    } finally{
        loading.value = false
    }
}

onMounted(() => {
    fetchSurvey()
})

provide('survey', {
    survey
})

provide('responses', {
    responses
})
</script>

<template>
    <header class="flex-ctr-c">
        <h1 v-if="survey">{{ survey.title }}</h1>
        <p v-if="survey">{{ survey.description }}</p>
    </header>
    <main>
        <ul v-if="survey">
            <Question
                v-for="question in survey.questions"
                :key="question.id"
                :qID="question.id"/>
        </ul>
        <button 
            class="accent-btn gc-btn sp-btn mfs-btn" 
            @click="submitResponse">
            Sumbit
        </button>
    </main>
</template>

<style scoped>
header{
    padding-block: 1rem;
    margin-bottom: 1.5rem;
}

main{
    margin: 0;
}

ul{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0;
    margin: 0;
}

button{
    margin: 1rem;
}
</style>