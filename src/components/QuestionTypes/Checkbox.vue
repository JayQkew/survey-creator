<script setup>
import { inject } from 'vue';

const props = defineProps({
    data: Object
})

const answer = props.data
const { responses } = inject('responses', {})

function handleInput(e){
    const existingIndex = responses.value.findIndex(r => r.answer_id === answer.id)

    if (existingIndex !== -1){
        responses.value.splice(existingIndex, 1)
    } else {
        responses.value.push({
            user_id: 1,
            question_id: answer.question_id,
            survey_id: answer.survey_id,
            answer_id: answer.id
        })
    }
}
</script>

<template>
    <div>
        <input 
            type="checkbox" 
            :id="answer.id" 
            :name="answer.question_id" 
            :value="answer.value"
            @change="handleInput">
        <label :for="answer.id">{{ answer.value }}</label>
    </div>
</template>

<style scoped>
div{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
}
</style>