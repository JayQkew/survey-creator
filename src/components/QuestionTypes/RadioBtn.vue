<script setup>
import { inject } from 'vue'

const props= defineProps({
    data: Object
})

const answer = props.data
const { responses } = inject('responses', {})

function handleInput(e) {
    const existingIndex = responses.value.findIndex(r => r.question_id === answer.question_id);

    const newResponse = {
        user_id: 1,
        question_id: answer.question_id,
        survey_id: answer.survey_id,
        answer_id: answer.id
    };

    if (existingIndex !== -1) {
        responses.value[existingIndex] = newResponse;
    } else {
        responses.value.push(newResponse);
    }
}
</script>

<template>
    <div class="flex-ctr-c">
        <input 
            type="radio" 
            :id="answer.id" 
            :name="answer.question_id" 
            :value="answer.value"
            @change="handleInput">
        <label :for="answer.id">{{ answer.value }}</label>
    </div>
</template>

<style scoped>
</style>