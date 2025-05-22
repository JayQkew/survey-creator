<script setup>
import RadioBtn from './RadioBtn.vue';
import MultipleChoiceDetails from './MultipleChoiceDetails.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

const props = defineProps({
    q: Object
})
const choices = props.q.typeDetail.map(choice => {
    return {value: choice, id: props.q.id}
})
</script>

<template>
    <div v-if="isRespondent">
        <RadioBtn v-for="c in choices" :data="c"/>
    </div>
    <div v-else>
        <MultipleChoiceDetails :q="props.q"/>
    </div>
</template>

<style>
</style>