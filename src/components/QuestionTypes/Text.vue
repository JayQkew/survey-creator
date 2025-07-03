<script setup>
import { inject, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))

const props = defineProps({
    q: Object
})

const loading = ref(true)
const answer = ref({
    survey_id: route.params.surveyId,
    value: '',
    created_by: 1,
    question_id: props.q.id
})

const d = {
    value: '',
    id: props.q.id
}
const { responses } = inject('responses', {})

console.log(responses)
// if(responses != undefined) responses.value.find(r => r.qId === d.id).answer = ['']

// function handleInput(e){
//     responses.value.find(r => r.qId === d.id).answer[0] = e.target.value
//     console.log(responses.value)
// }
</script>

<template>
    <input 
        v-if="isRespondent"
        class="text-input tc-i mp-i sfs-i"
        type="text" 
        placeholder="Type response here" 
        @change="handleInput">
    <input 
        v-else
        class="text-input tc-i mp-i sfs-i"
        type="text"
        placeholder="Type response here">
</template>

<style scoped>
input{
    height: 2.5rem;
    margin-right: 3rem;
}
</style>