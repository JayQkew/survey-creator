<script setup>
const props = defineProps({
    data: Object
})

const d = props.data
</script>

<template>
    <div>
        <input type="checkbox" :id="String(d.value)" :name="d.id" :value="d.value">
        <label :for="String(d.value)">{{ String(d.value) }}</label>
    </div>
</template>

<style></style>