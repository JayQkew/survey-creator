<script setup>
import RadioBtn from './RadioBtn.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

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
    <div >
        <RadioBtn v-if="isRespondent" v-for="btn in scaleBtns" :data="btn"/>
        <p v-else v-for="btn in scaleBtns">{{ btn.value }}</p>
    </div>
</template>

<style>
</style>