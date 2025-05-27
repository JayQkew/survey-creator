<script setup>
import Checkbox from './Checkbox.vue';
import MatrixDetails from './MatrixDetails.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))
const props = defineProps({
    details: Array,
    id: String,
    q: Object
})

// const allChoices = props.details
// const allChoices = props.details
</script>

<template>
    <p>This is a matrix question (let the user choose multiple of the options)</p>
    <div v-if="isRespondent">
        <Checkbox 
            v-for="choice in props.q.type_detail" 
            :data="choice" 
            :id="props.q.id"/>
    </div>
    <div v-else>
        <MatrixDetails :q="props.q"/>
    </div>
</template>

<style>
</style>