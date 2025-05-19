<script setup>
import RadioBtn from './RadioBtn.vue'
const props = defineProps({
    details: Array,
    id: String
})

const scaleDetail = props.details[0]
let scaleBtns = []

if (scaleDetail === 'agreeableness'){
    scaleBtns = [
        { value: "Strongly Agree", id: props.id },
        { value: "Agree", id: props.id },
        { value: "Neutral", id: props.id },
        { value: "Disagree", id: props.id },
        { value: "Strongly Disagree", id: props.id }
    ]
} else {
    for(let i = 0; i < scaleDetail; i++){
        scaleBtns.push(
            { value: i+1, id: props.id }
        )
    }
}
</script>

<template>
    <div>
        <RadioBtn v-for="btn in scaleBtns" :data="btn"/>
    </div>
</template>

<style>
</style>