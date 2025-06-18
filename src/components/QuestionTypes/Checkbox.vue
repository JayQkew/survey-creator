<script setup>
const props = defineProps({
    data: Object,
    id: String
})

const d = props.data
</script>

<template>
    <div>
        <input type="checkbox" :id="d.id" :name="d.id" :value="d.value">
        <label :for="d.id">{{ d.value.value }}</label>
    </div>
</template>

<style></style>