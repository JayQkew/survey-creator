<script setup>
import { inject } from 'vue'

const props= defineProps({
    data: Object
})

const answer = props.data
const { responses } = inject('responses', {})

// responses.value.find(r => r.qId === d.id).answer = [{}]
// console.log(responses.value)

// function handleInput(e){
//     responses.value.find(r => r.qId === answer.id).answer[0] = answer.value
// }

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
        console.log('Updated existing response');
    } else {
        // Add new response
        responses.value.push(newResponse);
        console.log('Added new response');
    }

    console.log(responses.value);
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