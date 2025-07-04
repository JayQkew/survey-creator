<script setup>
import { onMounted, ref } from 'vue';
import SurveyNav from '../components/SurveyNav.vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const responses = ref([])
const questionResponses = ref([])
const answerResponses = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchResponses(){
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch('http://localhost:3000/api/get-responses', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ survey_id: route.params.surveyId })
        })

        if(!response.ok){
            throw new Error('HTTP error! status: ' + response.status)
        }

        responses.value = await response.json()

        splitToQuestions()
        splitToAnswers()
        console.log(responses.value)
        console.log(questionResponses.value)
        console.log(answerResponses.value)
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

function splitToQuestions(){
    const questionMap = new Map()
    
    responses.value.forEach(response => {
        const questionId = response.question_id
        
        if (!questionMap.has(questionId)) {
            questionMap.set(questionId, {
                question_id: questionId,
                responses: []
            })
        }
        
        questionMap.get(questionId).responses.push(response)
    })
    
    questionResponses.value = Array.from(questionMap.values())
}

function splitToAnswers(){
    const answerMap = new Map()
    
    responses.value.forEach(response => {
        const answerId = response.answer_id
        
        if (!answerMap.has(answerId)) {
            answerMap.set(answerId, {
                answer_id: answerId,
                responses: []
            })
        }
        
        answerMap.get(answerId).responses.push(response)
    })
    
    answerResponses.value = Array.from(answerMap.values())
}

onMounted(() => {
    fetchResponses()
})
</script>

<template>
    <header class="flex-ctr-c">
        <SurveyNav/>
        <h1>Survey Data View</h1>
    </header>
</template>

<style>
</style>