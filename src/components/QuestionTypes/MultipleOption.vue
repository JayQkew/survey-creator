<script setup>
import Checkbox from './Checkbox.vue';
import ListItems from './ListItems.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))
const props = defineProps({
    details: Array,
    id: String,
    q: Object
})

const choices = JSON.parse(props.q.type_detail).options.map(choice => {
    return {value: choice, id: props.q.id}
})
</script>

<template>
    <div v-if="isRespondent">
        <Checkbox 
            v-for="choice in choices" 
            :data="choice"
            :key="choice.id" 
            :id="choice.value.id"/>
    </div>
    <div v-else class="list-options">
        <ListItems :q="props.q"/>
    </div>
</template>

<style>
.list-options{
    width: 100%;
}
</style>