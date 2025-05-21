<script setup>
import { inject, ref } from 'vue'

const { survey } = inject('survey')
const props = defineProps({
    detail: Array
})
const scaleType = ref(props.detail === 'agreeableness' ? 'agreeableness' : 'number')
const scaleValue = ref(props.detail)
</script>

<template>
    <label for="scale-type">Choose question type:</label>
    <select name="scale-type" id="scale-type" v-model="scaleType">
        <option value="number">Number</option>
        <option value="agreeableness">Agreeableness</option>
    </select>

    <div v-if="scaleType === 'agreeableness'">
        <ul>
            <li>strongly agree</li>
            <li>agree</li>
            <li>neutral</li>
            <li>disagree</li>
            <li>strongly disagree</li>
        </ul>
    </div>
    <div v-else>
        <label for="scale-input">From 1 to </label>
        <input 
            type="number" 
            min="2" 
            max="20"
            v-model="scaleValue"
            name="scale-input">
    </div>
</template>

<style></style>