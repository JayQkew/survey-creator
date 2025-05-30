<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    q: Object
})

const typeValue = ref(props.q.type)

function handleChange(){
    props.q.type = typeValue.value
}

watch(typeValue, () =>{
    handleChange()
})
</script>

<template>
    <label for="question-type">Type:</label>
    <select name="question-type" id="question-type" v-model="typeValue">
        <option value="single">Single Option</option>
        <option value="multiple">Multiple Options</option>
        <option value="text">Text</option>
    </select>
</template>
