<script setup>
import { ref } from 'vue'
const scaleType = ref('number')
</script>

<template>
    <label for="scale-type">Choose question type:</label>
    <select name="scale-type" id="scale-type" v-model="scaleType">
        <option value="number">Number</option>
        <option value="agreeableness">Agreeableness</option>
    </select>

    <label for="scale-input">From 1 to </label>
    <input v-if="scaleType === 'number'" type="number" min="2" max="20" name="scale-input">
</template>

<style></style>