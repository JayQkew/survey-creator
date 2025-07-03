<script setup>
import RadioBtn from './RadioBtn.vue';
import ListItems from './ListItems.vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const isRespondent = computed(() => route.path.includes('res'))

const props = defineProps({
    q: Object
})

const loading = ref(true)
const answers = ref([])

watch(
    () => props.q.answers,
    (newAnswers) => {
        if (Array.isArray(newAnswers)) {
            answers.value = newAnswers
            loading.value = false
        }
    },
    { immediate: true }
)
</script>

<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else-if="isRespondent && !loading" class="respondent-radio">
        <RadioBtn 
            v-for="a in answers" 
            :key="a.id" 
            :data="a"/>
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