<script setup>
import Checkbox from './Checkbox.vue';
const props = defineProps({
    details: Array,
    id: String
})

const allChoices = props.details
</script>

<template>
    <p>This is a matrix question (let the user choose multiple of the options)</p>
    <div>
        <Checkbox v-for="choice in allChoices" :data="choice" :id="props.id"/>
    </div>
</template>

<style>
</style>