<script>
const props = defineProps({
    question: Object
})
</script>

<template>
    <li>
        <section>
            <h3>{{ props.question }}</h3>
            <p>type: {{ props.type }} {{ props.typeDetail }}</p>
        </section>
    </li>
</template>

<style scoped>
section{
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    border: 3px solid var(--dark);
    border-radius: 1.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
}
</style>