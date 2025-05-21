<script setup>
import RadioBtn from './RadioBtn.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const props = defineProps({
    details: Array,
    id: String
})
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))


const btns = [
    { value: "yes", id: props.id},
    { value: "no", id: props.id}
]
</script>

<template>
   <div v-if="isRespondent">
        <RadioBtn v-for="btn in btns" :data="btn"/>
   </div>
   <p v-else>
        Yes or No Responses
   </p>

</template>

<style>
</style>