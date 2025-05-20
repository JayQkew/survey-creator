<script setup>
import Scale from '../components/QuestionTypes/Scale.vue'
import Matrix from '../components/QuestionTypes/Matrix.vue'
import Text from '../components/QuestionTypes/Text.vue'
import MultipleChoice from '../components/QuestionTypes/MultipleChoice.vue'
import YesNo from '../components/QuestionTypes/YesNo.vue'

const props = defineProps({
    q: Object
})

const q = props.q;
</script>

<template>
    <li>
        <section>
            <h2>{{ q.question }}</h2>
            <Scale v-if="q.type === 'scale'" :details="q.typeDetail" :id="q.id"/>
            <Matrix v-else-if="q.type === 'matrix'" :details="q.typeDetail" :id="q.id"/>
            <Text v-else-if="q.type === 'text'" :details="q.typeDetail" :id="q.id"/>
            <MultipleChoice v-else-if="q.type === 'multipleChoice'" :details="q.typeDetail" :id="q.id"/>
            <YesNo v-else :details="q.typeDetail" :id="q.id"/>
        </section>
    </li>
</template>

<style scoped>
li{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--dark);
    border-radius: 1rem;
    width: 100%;
}
</style>