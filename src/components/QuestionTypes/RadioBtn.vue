<script setup>
import { inject } from 'vue'

const props= defineProps({
    data: Object
})

const d = props.data
const { responses } = inject('responses')

console.log(responses.value)

function handleInput(){
    //find the qID
    // add the response here
    responses.value.find()
}
</script>

<template>
    <div>
        <input type="radio" :id="d.value.id" :name="d.id" :value="d.value">
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