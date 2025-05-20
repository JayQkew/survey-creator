<script setup>
import { ref } from 'vue'
import ScaleDetails from './QuestionTypes/ScaleDetails.vue';
const typeValue = ref('scale')
</script>

<template>
    <label for="question-type">Choose question type:</label>
    <select name="question-type" id="question-type" v-model="typeValue">
        <option value="scale">Scale</option>
        <option value="matrix">Matrix</option>
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="yesNo">Yes No</option>
    </select>

    <!-- render based on value of the question-type -->
    <!-- <p v-if="typeValue === 'scale'">This is a scale question</p> -->
    <ScaleDetails v-if="typeValue == 'scale'"/>
    <p v-else-if="typeValue === 'matrix'">This is a matrix question</p>
    <p v-else-if="typeValue === 'text'">This is a text question</p>
    <p v-else-if="typeValue === 'multipleChoice'">This is a multiple choice question</p>
    <p v-else-if="typeValue === 'yesNo'">This is a Yes No question</p>
    <p v-else>HAIBO</p>

</template>
