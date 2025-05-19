<script setup>
import Checkbox from './Checkbox.vue';
const props = defineProps({
    details: Array,
    id: String
})
</script>

<template>
    <p>This is a matrix question (let the user choose multiple of the options)</p>
    <div>
        <Checkbox />
    </div>
</template>

<style>
</style>