<script setup>
import { onMounted, ref } from 'vue';
import SurveyNav from '../components/SurveyNav.vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const responses = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchResponses(){
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch('http://localhost:3000/api/get-responses', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: route.params.surveyId })
        })

        if(!response.ok){
            throw new Error('HTTP error! status: ' + response.status)
        }
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    //fetchResponses()
})
</script>

<template>
    <header class="flex-ctr-c">
        <SurveyNav/>
        <h1>Survey Data View</h1>
    </header>
</template>

<style>
</style>