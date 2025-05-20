<script setup>
import Scale from '../components/QuestionTypes/Scale.vue'
import Matrix from '../components/QuestionTypes/Matrix.vue'
import Text from '../components/QuestionTypes/Text.vue'
import MultipleChoice from '../components/QuestionTypes/MultipleChoice.vue'
import YesNo from '../components/QuestionTypes/YesNo.vue'
import QuestionDetail from '../components/QuestionDetails.vue'
import { ref } from 'vue'

const props = defineProps({
    q: Object
})

defineEmits(['questionName'])

const name = ref(props.q.question)

const q = props.q;

function onInput(e) {
    name.value = e.target.value
}

function updateQuestion() {
    props.q.question = name.value
    emit('questionName', { questionId: props.q.id, value: name.value })
}

function onKeyDown(e) {
    if (e.key === 'Enter') {
        updateQuestion()
        e.target.blur()
    }
}

</script>

<template>
    <li>
        <section>
            <h2 v-if="q.question != ''">{{ q.question }}</h2>
            <input 
                v-else 
                type="text" 
                name="quesiton-name" 
                id="question-name" 
                :value="name" 
                @input="onInput"
                @blur="updateQuestion"
                @keydown="onKeyDown">

            <Scale v-if="q.type === 'scale'" :details="q.typeDetail" :id="q.id"/>
            <Matrix v-else-if="q.type === 'matrix'" :details="q.typeDetail" :id="q.id"/>
            <Text v-else-if="q.type === 'text'" :details="q.typeDetail" :id="q.id"/>
            <MultipleChoice v-else-if="q.type === 'multipleChoice'" :details="q.typeDetail" :id="q.id"/>
            <YesNo v-else-if="q.type === 'yesNo'" :details="q.typeDetail" :id="q.id"/>
            <QuestionDetail v-else/>
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