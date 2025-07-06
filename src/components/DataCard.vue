<script setup>
import { onMounted, ref } from 'vue'


const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})

const question = ref(null)
const loading = ref(false)
const error = ref(null)

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

        question.value = await response.json()
        console.log(question.value)
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

onMounted(fetchQuestion)
</script>

<template>
    <li class="flex-ctr">
        <section class="card pop-out flex-ctr-c">
            <div class="card-header">
                <h2 v-if="question">{{ question.text }}</h2>
            </div>
            <div class="card-body">
            </div>
        </section>
    </li>
</template>

<style scoped>
</style>