<script setup>
import { inject } from 'vue';

const props = defineProps({
    data: Object
})

const d = props.data
const { responses } = inject('responses')

responses.value.find(r => r.qId === d.id).answer = []

function handleInput(e){
    const response = responses.value.find(r => r.qId === d.id);
    const existingAnswer = response.answer.find(answer => answer.id === d.value.id);
    
    if (e.target.checked) {
        if (!existingAnswer) {
            response.answer.push(d.value);
        }
    } else {
        response.answer = response.answer.filter(answer => answer.id !== d.value.id);
    }
    console.log(responses.value)
}
</script>

<template>
    <div>
        <input 
            type="checkbox" 
            :id="d.value.id" 
            :name="d.id" 
            :value="d.value"
            @change="handleInput">
        <label :for="d.value.id">{{ d.value.value }}</label>
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