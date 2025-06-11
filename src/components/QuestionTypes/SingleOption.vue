<script setup>
import RadioBtn from './RadioBtn.vue';
import ListItems from './ListItems.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))

const props = defineProps({
    q: Object
})

console.log(props.q.type_detail)
const choices = JSON.parse(props.q.type_detail).options.map(choice => {
    console.log(choice)
    return {value: choice, id: props.q.id}
})
</script>

<template>
    <div v-if="isRespondent">
        <RadioBtn v-for="c in choices" :data="c"/>
    </div>
    <div v-else class="list-options">
        <ListItems :q="props.q"/>
    </div>    
</template>

<style>
</style>