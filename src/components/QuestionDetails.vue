<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    q: Object
})

const typeValue = ref(props.q.type)
const loading = ref(false)
const error = ref(null)

async function handleChange(){
    props.q.type = typeValue.value
    loading.value = true
    error.value = null
    try{
        const response = await fetch('http://localhost:3000/api/update-question-type', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: props.q.id,
                question_type: typeValue.value
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}
 
watch(typeValue, () =>{
    handleChange()
})
</script>

<template>
    <div class="question-type-container">
        <p for="question-type">Type:</p>
        <select name="question-type" id="question-type" v-model="typeValue">
            <option value="single">Single Option</option>
            <option value="multiple">Multiple Options</option>
            <option value="text">Text</option>
        </select>
    </div>
</template>

<style scoped>
.question-type-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 100%;
}

select{
    height: 100%;
}
</style>
