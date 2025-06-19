<script setup>
import { inject } from 'vue'

const props= defineProps({
    data: Object
})

const d = props.data
const { responses } = inject('responses')

console.log(d)

responses.value.find(r => r.qId === d.id).answer = [{}]
console.log(responses.value)

function handleInput(e){
    responses.value.find(r => r.qId === d.id).answer[0] = d.value
}
</script>

<template>
    <div>
        <input 
            type="radio" 
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>