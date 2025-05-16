<script setup>
const props = defineProps({
    q: Object
})
</script>

<template>
    <li>
        <section>
            <h2>{{ props.q.question }}</h2>
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