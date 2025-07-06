<script setup>
import { onMounted, ref } from 'vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})

console.log(props.question)

const question = ref(null)
const answers = ref(null)
const loading = ref(false)
const error = ref(null)
const totalResponses = ref(0)

async function fetchQuestion() {
    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/get-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question_id: props.question.question_id })
        })

        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        }

        const q = await response.json()
        question.value = JSON.parse(q)[0] // Ensure it's parsed if it's a string
        getTotalResponses()
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

async function fetchAnswers() {
    loading.value = true
    error.value = null

    try {
        const response = await fetch('http://localhost:3000/api/get-answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question_id: props.question.question_id })
        })

        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        }

        const answers = await response.json()
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

function getTotalResponses() {
    totalResponses.value = props.question.answers.reduce((total, answer) => total + answer.responses.length, 0)
}

onMounted(fetchQuestion)
</script>

<template>
    <li class="flex-ctr">
        <section class="card pop-out flex-ctr-c">
            <div class="card-header">
                <h2 v-if="question">{{ question.text }}</h2>
            </div>
            <div class="card-body" >
                <ProgressBar 
                    v-for="(answer) in props.question.answers"
                    :denominator="totalResponses"
                    :numerator="answer.responses.length"/>
            </div>
        </section>
    </li>
</template>

<style scoped>
li{
    width: 100%;
}

.pop-out{
    transition: all 0.2s;
}

.pop-out:hover{
    transform: translateY(-0.25rem);
    box-shadow: 0 0.25rem 0 var(--text-colour);
}

.card{
    box-sizing: border-box;
    border: var(--border);
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    gap: 0.5rem;
    background-color: var(--background-colour);
}

.card-body{
    box-sizing: border-box;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
}
</style>