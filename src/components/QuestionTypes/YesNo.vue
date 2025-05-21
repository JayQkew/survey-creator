<script setup>
import RadioBtn from './RadioBtn.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const props = defineProps({
    q: Object
})
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

const btns = [
    { value: "yes", id: props.q.id},
    { value: "no", id: props.q.id}
]
</script>

<template>
   <div v-if="isRespondent">
        <RadioBtn v-for="btn in btns" :data="btn"/>
   </div>
   <p v-else>Yes or No Responses</p>

</template>

<style>
</style>