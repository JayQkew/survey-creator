<script setup>
import Checkbox from './Checkbox.vue';
import ListItems from './ListItems.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const isRespondent = computed(() => route.path.includes('respondent'))
const props = defineProps({
    details: Array,
    id: String,
    q: Object
})
</script>

<template>
    <p>let the user choose multiple options</p>
    <div v-if="isRespondent">
        <Checkbox 
            v-for="choice in props.q.type_detail" 
            :data="choice" 
            :id="props.q.id"/>
    </div>
    <div v-else>
        <ListItems :q="props.q"/>
    </div>
</template>

<style></style>