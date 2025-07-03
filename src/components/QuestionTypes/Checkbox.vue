<script setup>
import { inject } from 'vue';

const props = defineProps({
    data: Object
})

const answer = props.data
const { responses } = inject('responses', {})

// responses.value.find(r => r.qId === d.id).answer = []

// function handleInput(e){
//     const response = responses.value.find(r => r.qId === answer.id);
//     const existingAnswer = response.answer.find(answer => answer.id === answer.value.id);
    
//     if (e.target.checked) {
//         if (!existingAnswer) {
//             response.answer.push(answer.value);
//         }
//     } else {
//         response.answer = response.answer.filter(answer => answer.id !== answer.value.id);
//     }
//     console.log(responses.value)
// }
</script>

<template>
    <div>
        <input 
            type="checkbox" 
            :id="answer.id" 
            :name="answer.question_id" 
            :value="answer.value">
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