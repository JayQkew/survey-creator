<script setup>
import ProgressBar from './ProgressBar.vue';

const props = defineProps({
    answer: {
        type: Object,
        required: true
    },
    totalResponses: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <li>
        <p>{{ props.answer.value }}</p>
        <ProgressBar 
            :denominator="props.totalResponses"
            :numerator="props.answer.responses"/>
    </li>
</template>

<style scoped>
li{
    display: flex;
    flex-direction: row;
    width: 100%;
}

p{
    width: 30%;
    overflow: hidden;
}
</style>