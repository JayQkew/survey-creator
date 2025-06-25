<script setup>
</script>

<template>
    <nav class="flex-ctr-r">
        <router-link >Edit</router-link>
        <router-link >Responses</router-link>
        <router-link >Share</router-link>
        <router-link >Save</router-link>
        <router-link >Delete</router-link>
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