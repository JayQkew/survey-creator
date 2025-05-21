<script setup>
import { ref } from 'vue'
import ScaleDetails from './QuestionTypes/ScaleDetails.vue';
import MatrixDetails from './QuestionTypes/MatrixDetails.vue';
import MultipleChoiceDetails from './QuestionTypes/MultipleChoiceDetails.vue';

const typeValue = ref('scale')
const emit = defineEmits(['type'])

function handleChange(e){
    typeValue.value = e.target.value
    emit('type', { type: typeValue.value})
}
</script>

<template>
    <label for="question-type">Choose question type:</label>
    <select 
        name="question-type" 
        id="question-type" 
        :value="typeValue" 
        @change="handleChange">
        <option value="scale">Scale</option>
        <option value="matrix">Matrix</option>
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="yesNo">Yes No</option>
    </select>

    <ScaleDetails v-if="typeValue == 'scale'"/>
    <MatrixDetails v-else-if="typeValue === 'matrix'"/>
    <MultipleChoiceDetails v-else-if="typeValue === 'multipleChoice'"/>
    <p v-else>HAIBO</p>

</template>
