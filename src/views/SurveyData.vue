<script setup>
import { onMounted, provide, ref } from 'vue';
import SurveyNav from '../components/SurveyNav.vue';
import { useRoute } from 'vue-router'
import DataCard from '../components/DataCard.vue';

const route = useRoute()

const responses = ref([])
const questionResponses = ref([])
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
        console.log(responses.value)

        if (responses.value.length === 0) fetchQuestions()
        splitToQuestions()
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

async function fetchQuestions(){
    loading.value = true
    error.value = null

    try {
        const response = await fetch('http://localhost:3000/api/get-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({survey_id: route.params.surveyId})
        })
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const questions = await response.json()
        
        console.log(questions)
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
        const answerId = response.answer_id
        
        if (!questionMap.has(questionId)) {
            questionMap.set(questionId, {
                question_id: questionId,
                answers: []
            })
        }
        
        const question = questionMap.get(questionId)
        let answer = question.answers.find(a => a.answer_id === answerId)
        
        if (!answer) {
            answer = {
                answer_id: answerId,
                responses: []
            }
            question.answers.push(answer)
        }
        
        answer.responses.push(response)
    })
    
    questionResponses.value = Array.from(questionMap.values())
}

onMounted(() => {
    fetchResponses()
})

provide('responses', questionResponses)
</script>

<template>
    <header class="flex-ctr-c">
        <SurveyNav/>
        <h1>Survey Data View</h1>
    </header>
    <main>
        <ul class="flex-ctr-c">
            <DataCard 
                v-for="question in questionResponses" 
                :key="question.question_id" 
                :question="question"/>
        </ul>
    </main>
</template>

<style scoped>
ul{
    width: 100%;
    list-style: none;
    gap: 1rem;
    margin: 0;
    padding: 0;
}
</style>