<script setup>
import { onMounted, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import Question from '../components/Question.vue'

const route = useRoute()

const questions = ref(null)
const responses = ref(null)
const survey = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchSurveyData(){
    const data = route.params.surveyId

    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/get-survey', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: data})
        })

        if(!response.ok){
            throw new Error('HTTPS error! status: '+ response.status)
        }

        survey.value = await response.json()
        // console.log(survey.value)
        questions.value = survey.value.questions
        console.log(questions.value)
        responses.value = questions.value.map(q => {
            const typeDetails = JSON.parse(q.type_detail)
            const options = typeDetails.options
            return {
                qId: q.id,
                options: options,
                answer: []
            }
        })
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

async function submitResponse(){
    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/submit-response', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: responses.value})
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
    fetchSurveyData()
})

provide('survey', {
    survey
})

provide('responses', {
    responses
})
</script>

<template>
    <header>
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
        <button @click="submitResponse" class="submit-btn">Sumbit</button>
    </main>
</template>

<style scoped>
header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

.submit-btn{
    margin: 1rem;
    font-family: var(--regular-font);
    font-weight: bolder;
    padding: 0.5rem 1rem;
    border: 1px solid var(--blue-1);
    background-color: var(--background-colour);
    color: var(--blue-1);
    border-radius: 0.25rem;
    transition: all 0.2s;
}

.submit-btn:hover{
    color: var(--background-colour);
    background-color: var(--blue-1);
    transform: translateY(-0.25rem);
    box-shadow: 0 0.25rem 0 var(--text-colour);
}

.submit-btn:active{
    color: var(--blue-1);
    background-color: var(--background-colour);
    transform: translateY(0);
    box-shadow: 0 0 0 var(--text-colour);
}
</style>