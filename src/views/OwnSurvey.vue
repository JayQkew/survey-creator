<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// const surveyId = ref(null);

// onMounted(() =>{
//     surveyId.value = route.params.surveyId
// })
</script>

<template>
    <h1>Owner Survey: {{ $route.params.surveyId }}</h1>
    <p>Where the Owner views data, adds questions, & edits the survey</p>
</template>

<style></style>