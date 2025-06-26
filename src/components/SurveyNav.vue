<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <nav class="flex-ctr-r">
        <router-link 
          :to="{
            name: 'survey-edit', 
            params: { 
              id: route.params.id, 
              surveyId: route.params.surveyId 
            }
          }"
        >
          Edit
        </router-link>
        
        <router-link 
          :to="{
            name: 'survey-data', 
            params: { 
              id: route.params.id, 
              surveyId: route.params.surveyId 
            }
          }"
        >
          Report
        </router-link>
        <a href="">Share</a>
        <a href="">Save</a>
        <a href="">Delete</a>
    </nav>
</template>

<style scoped>
nav{
  gap: 0.5rem;
  background-color: var(--text-colour);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-block: 1rem
}

nav a{
  background-color: var(--text-colour);
  font-weight: bold;
  color: var(--background-colour);
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--text-colour);
  border-radius: 0.25rem;  
  transition: var(--transition);
}

nav a:hover{
  background-color: var(--background-colour);
  color: var(--text-colour);
}
</style>