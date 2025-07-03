<script setup>
import Checkbox from './Checkbox.vue';
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
    <div v-if="isRespondent">
        <Checkbox 
            v-for="a in answers" 
            :key="a.id"
            :data="a"/>
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