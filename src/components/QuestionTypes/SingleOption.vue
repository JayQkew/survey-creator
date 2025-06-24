<script setup>
import RadioBtn from './RadioBtn.vue';
import ListItems from './ListItems.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))

const props = defineProps({
    q: Object
})

console.log(props.q.type_detail)
const choices = JSON.parse(props.q.type_detail).options.map(choice => {
    return {value: choice, id: props.q.id}
})
</script>

<template>
    <div v-if="isRespondent" class="respondent-radio">
        <RadioBtn v-for="c in choices" :key="c.id" :data="c"/>
    </div>
    <div v-else class="list-options">
        <ListItems :q="props.q"/>
    </div>    
</template>

<style>
.respondent-radio{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
}
</style>