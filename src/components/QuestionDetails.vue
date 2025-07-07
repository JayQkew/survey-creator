<script setup>
import { inject, ref, watch } from 'vue'
const { survey } = inject('survey')
const props = defineProps({
    q: Object
})

const typeValue = ref(props.q.type)

async function handleChange(){
    props.q.type = typeValue.value
}
 
watch(typeValue, () =>{
    handleChange()
})
</script>

<template>
    <div class="question-type-container flex-ctr-r">
        <p for="question-type">Type:</p>
        <select name="question-type" id="question-type" v-model="typeValue">
            <option value="single">Single Option</option>
            <option value="multiple">Multiple Options</option>
        </select>
    </div>
</template>

<style scoped>
.question-type-container{
    box-sizing: border-box;
    height: 2.5rem;
    width: 100%;
    gap: 0.5rem;
}

select{
    color: var(--text-colour);
    box-sizing: border-box;
    font: var(--regular-font);
    font-size: medium;
    height: 100%;
    width: 100%;
    border: var(--border);
    border-radius: 0.25rem;
    background-color: var(--background-colour);
}
</style>
