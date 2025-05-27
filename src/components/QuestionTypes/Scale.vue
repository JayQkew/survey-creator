<script setup>
import RadioBtn from './RadioBtn.vue'
import ScaleDetails from './ScaleDetails.vue';
import { computed, inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

const props = defineProps({
    q: Object
})

const scaleDetail = ref(props.q.type_detail)
let scaleBtns = []

if (scaleDetail === 'agreeableness'){
    scaleBtns = [
        { value: "Strongly Agree", id: props.q.id },
        { value: "Agree", id: props.q.id },
        { value: "Neutral", id: props.q.id },
        { value: "Disagree", id: props.q.id },
        { value: "Strongly Disagree", id: props.q.id }
    ]
} else {
    for(let i = 0; i < scaleDetail; i++){
        scaleBtns.push(
            { value: i+1, id: props.q.id }
        )
    }
}
</script>

<template>
    <div v-if="isRespondent">
        <RadioBtn  v-for="btn in scaleBtns" :data="btn"/>
    </div>
    <div v-else>
        <ScaleDetails :detail="scaleDetail"/>
    </div>
</template>

<style>
</style>