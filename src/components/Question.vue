<script setup>
import Scale from '../components/QuestionTypes/Scale.vue'
import Matrix from '../components/QuestionTypes/Matrix.vue'
import Text from '../components/QuestionTypes/Text.vue'
import MultipleChoice from '../components/QuestionTypes/MultipleChoice.vue'
import YesNo from '../components/QuestionTypes/YesNo.vue'

const props = defineProps({
    q: Object
})
</script>

<template>
    <li>
        <section>
            <h2>{{ props.q.question }}</h2>
            <Scale v-if="props.q.type === 'scale'"/>
            <Matrix v-else-if="props.q.type === 'matrix'"/>
            <Text v-else-if="props.q.type === 'text'"/>
            <MultipleChoice v-else-if="props.q.type === 'multipleChoice'"/>
            <YesNo v-else />
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
    justify-content: center;
    align-items: center;
    border: 3px solid var(--dark);
    border-radius: 1rem;
    width: 100%;
}
</style>