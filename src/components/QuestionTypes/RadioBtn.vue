<script setup>
import { inject } from 'vue'

const props= defineProps({
    data: Object
})

const answer = props.data
// const { responses } = inject('responses', {})

console.log(answer)

// responses.value.find(r => r.qId === d.id).answer = [{}]
// console.log(responses.value)

// function handleInput(e){
//     responses.value.find(r => r.qId === answer.id).answer[0] = answer.value
// }
</script>

<template>
    <div class="flex-ctr-c">
        <input 
            type="radio" 
            :id="answer.id" 
            :name="answer.question_id" 
            :value="answer.value">
        <label :for="answer.id">{{ answer.value }}</label>
    </div>
</template>

<style scoped>
</style>