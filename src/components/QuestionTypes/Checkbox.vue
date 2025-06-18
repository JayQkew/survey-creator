<script setup>
const props = defineProps({
    data: Object
})

const d = props.data
</script>

<template>
    <div>
        <input type="checkbox" :id="d.value.id" :name="d.id" :value="d.value">
        <label :for="d.value.id">{{ d.value.value }}</label>
    </div>
</template>

<style></style>