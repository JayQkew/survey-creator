<script setup>
const props = defineProps({
    data: Object,
    id: String
})

const d = props.data
</script>

<template>
    <div>
        <input type="checkbox" :id="d.id" :name="props.id" :value="d.option">
        <label :for="d.id">{{ d.option }}</label>
    </div>
</template>

<style></style>