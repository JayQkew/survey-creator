<script setup>
import RadioBtn from './RadioBtn.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

const props = defineProps({
    details: Array,
    id: String
})
const choices = props.details.map(p => {
    return {value: p, id: props.id}
})
</script>

<template>
    <div>
        <RadioBtn v-if="isRespondent" v-for="c in choices" :data="c"/>
    </div>
</template>

<style>
</style>