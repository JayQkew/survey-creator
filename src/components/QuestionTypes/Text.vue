<script setup>
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    q: Object
})

const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))

const d = {
    value: '',
    id: props.q.id
}
const { responses } = inject('responses')

responses.value.find(r => r.qId === d.id).answer = ['']

function handleInput(e){
    responses.value.find(r => r.qId === d.id).answer[0] = e.target.value
    console.log(responses.value)
}
</script>

<template>
    <input 
        v-if="isRespondent"
        type="text" 
        placeholder="Type response here" 
        class="type-response"
        @change="handleInput">
    <input 
        v-else
        type="text"
        placeholder="Type response here"
        class="type-response">
</template>

<style scoped>
.type-response{
    font-size: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    border-radius: 0.25rem;
    margin-right: 3rem;
}
</style>