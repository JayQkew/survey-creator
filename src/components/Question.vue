<script setup>
import Scale from '../components/QuestionTypes/Scale.vue'
import Matrix from '../components/QuestionTypes/Matrix.vue'
import Text from '../components/QuestionTypes/Text.vue'
import MultipleChoice from '../components/QuestionTypes/MultipleChoice.vue'
import YesNo from '../components/QuestionTypes/YesNo.vue'
import QuestionDetail from '../components/QuestionDetails.vue'
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

function updateQuestion() {
    q.question = name.value
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
            <h2 v-if="isRespondent">{{ q.question }}</h2>
            <input 
                v-else 
                type="text" 
                name="quesiton-name" 
                id="question-name"
                v-model="name" 
                @blur="updateQuestion"
                @keydown="onKeyDown">
            <button @click="deleteQuestion">Delete Question</button>
            <QuestionDetail v-if="!isRespondent" :q="q"/>
            
            <Scale v-if="q.type === 'scale'" :q="q"/>
            <Matrix v-else-if="q.type === 'matrix'" :q="q"/>
            <MultipleChoice v-else-if="q.type === 'multipleChoice'" :q="q"/>
            <YesNo v-else-if="q.type === 'yesNo'" :q="q"/>
            <Text v-else-if="q.type === 'text'"/>
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