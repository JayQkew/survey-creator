<script setup>
const props = defineProps({
    details: Array
})

const scaleDetail = props.details[0]
let display = ""

if (scaleDetail === 'agreeableness'){
    //print a scale of agreeableness
    display = "This is a scale of agreeableness"

} else {
    display = "On a scale from 1 to " + scaleDetail
}
</script>

<template>
    <p>This is a scale question (let the users choose from a given scale)</p>
    <p>
        {{ display }}
    </p>
</template>

<style>
</style>