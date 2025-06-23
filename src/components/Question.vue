<script setup>
import Text from '../components/QuestionTypes/Text.vue'
import QuestionDetail from '../components/QuestionDetails.vue'
import MultipleOption from './QuestionTypes/MultipleOption.vue'
import SingleOption from './QuestionTypes/SingleOption.vue'
import trashSvg from '../assets/trash-solid.svg?raw'
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))
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

async function deleteQuestion(){
    const index = survey.value.questions.findIndex((question) => question.id === props.qID)
    if (index !== -1) {
        survey.value.questions.splice(index, 1)
    }

    loading.value = true
    error.value = null
    try{
        const response = await fetch('http://localhost:3000/api/delete-question', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                id: props.qID
            })
        })
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (err){
        error.value = err
    } finally{
        loading.value = false
    }
}

</script>

<template>
    <li class="flex-ctr">
        <section class="question pop-out flex-ctr">
            <div class="question-header">
                <h2 v-if="isRespondent">{{ q.question_text }}</h2>
                <input 
                    v-else 
                    class="text-input tc-i mp-i lfs-i"
                    type="text" 
                    name="quesiton-name" 
                    id="question-name"
                    v-model="name" 
                    @blur="updateQuestion"
                    @keydown="onKeyDown"/>
                <button 
                    v-if="!isRespondent"
                    class="accent-btn rc-btn flex-ctr"
                    @click="deleteQuestion">
                    <div class="svg" v-html="trashSvg"></div>
                </button>
            </div>                                
            <section v-if="!isRespondent" class="question-body">
                <div class="question-main flex-ctr">
                    <template v-if="!q.type"/>
                    <Text v-if="q.type === 'text'" :q="q"/>
                    <SingleOption v-else-if="q.type === 'single'" :q="q">Single Option</SingleOption>
                    <MultipleOption v-else-if="q.type === 'multiple'" :q="q">Multiple Option</MultipleOption>
                </div>
                <div class="question-aside">
                    <QuestionDetail :q="q"/>
                    <p v-if="q.type === 'text'">Let the user type thier response</p>
                    <p v-else-if="q.type === 'single'">Let the user choose one of the options</p>
                    <p v-else-if="q.type === 'multiple'">Let the user choose multiple options</p>
                </div>
            </section>
            <section v-else class="respondent-body">
                    <Text v-if="q.type === 'text'" :q="q"/>
                    <SingleOption v-else-if="q.type === 'single'" :q="q">Single Option</SingleOption>
                    <MultipleOption v-else-if="q.type === 'multiple'" :q="q">Multiple Option</MultipleOption>
            </section>
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

.question{
    box-sizing: border-box;
    flex-direction: column;
    border: var(--border);
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    gap: 0.5rem;
    background-color: var(--background-colour);
}

.respondent-body{
    width: 100%;
}

.question-header{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 0.5rem;
    height: fit-content;
}

.question-header h2{
    margin-top: 0;
}

.question-body{
    box-sizing: border-box;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
}

.question-main{
    flex-direction: row;
    width: 70%;
}

.question-aside{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

.question-aside p{
    text-align: left;
}

button{
    width: 3rem;
    height: 3rem;
}

.svg{
    width: 2.5rem;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 1rem;
    height: 1rem;
}

.svg svg{
    fill: currentColor;
    margin: 0;
    padding: 0;
}
</style>