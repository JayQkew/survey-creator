<script setup>
import RadioBtn from './RadioBtn.vue';
const props = defineProps({
    details: Array,
    id: String
})

const btns = [
    { value: "yes", id: props.id},
    { value: "no", id: props.id}
]
</script>

<template>
   <div>
        <RadioBtn v-for="btn in btns" :data="btn"/>
   </div>
</template>

<style>
</style>