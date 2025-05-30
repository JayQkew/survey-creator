<script setup>
import Text from '../components/QuestionTypes/Text.vue'
import QuestionDetail from '../components/QuestionDetails.vue'
import MultipleOption from './QuestionTypes/MultipleOption.vue'
import SingleOption from './QuestionTypes/SingleOption.vue'
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))
const props = defineProps({
    qID: String
})

const { survey } = inject('survey')
const q = survey.value.questions.find((q) => q.id === props.qID)

const name = ref(q.question_text)

const loading = ref(false)
const error = ref(null)

async function updateQuestion() {
    q.question_text = name.value;
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch('http://localhost:3000/api/update-question-name', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: q.id,
                question_text: name.value
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Optionally handle response
    } catch (err) {
        error.value = err;
    } finally {
        loading.value = false;
    }
}

function onKeyDown(e) {
    if (e.key === 'Enter') {
        updateQuestion()
        e.target.blur()
    }
}

function deleteQuestion(){
    const index = survey.value.questions.findIndex((question) => question.id === props.qID)
    if (index !== -1) {
        survey.value.questions.splice(index, 1)
    }
}

</script>

<template>
    <li>
        <section>
            <div>
                <h2 v-if="isRespondent">{{ q.question }}</h2>
                <input 
                    v-else 
                    type="text" 
                    name="quesiton-name" 
                    id="question-name"
                    v-model="name" 
                    @blur="updateQuestion"
                    @keydown="onKeyDown"/>
                <button @click="deleteQuestion">Delete Question</button>
            </div>                                
            <template v-if="!isRespondent">
                <QuestionDetail :q="q"/>
                <!-- <template v-if="!q.type"></template> -->
                <Text v-if="q.type === 'text'"/>
                <SingleOption v-else-if="q.type === 'single'" :q="q">Single Option</SingleOption>
                <MultipleOption v-else-if="q.type === 'multiple'" :q="q">Multiple Option</MultipleOption>
            </template>
        </section>
    </li>
</template>

<style scoped>
li{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--dark);
    border-radius: 1.5rem;
    width: 100%;
}
</style>