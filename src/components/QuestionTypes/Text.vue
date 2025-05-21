<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

</script>

<template>
    <input v-if="isRespondent" type="text">
    <p v-else>This is a typed Response</p>
</template>

<style>
</style>