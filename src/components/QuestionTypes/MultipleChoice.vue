<script setup>
import RadioBtn from './RadioBtn.vue';
const props = defineProps({
    details: Array,
    id: String
})
const choices = props.details.map(p => {
    return {value: p, id: props.id}
})
</script>

<template>
    <div>
        <RadioBtn v-for="c in choices" :data="c"/>
    </div>
</template>

<style>
</style>