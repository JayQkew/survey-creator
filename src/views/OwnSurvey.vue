<script setup>
import { onMounted, ref } from 'vue'
import surveyData from '../survey-data.json'

const data = ref(null)

onMounted(() => {
  data.value = surveyData
});
</script>

<template>
<header>
    <h1>Owner Survey: {{ $route.params.surveyId }}</h1>
    <p>Where the Owner views data, adds questions, & edits the survey</p>
  </header>
  <main>
    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <!-- <h2>{{ data.title }}</h2> -->
      <p>Data:</p>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </main>
</template>

<style></style>