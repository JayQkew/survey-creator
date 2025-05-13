<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
    txt: String
})

const router = useRouter()

</script>

<template>
    <button>
        {{ txt || 'Button' }}
    </button>
</template>

<style scoped>
button{
    font-family: 'Ubuntu Bold', monospace;
    font-size: 2rem;
    background-color: var(--tan);
    color: var(--dark);
    width: fit-content;
    padding: 0.5rem 1rem;
    border: 3px solid var(--dark);
    border-radius: 100vw;
    cursor: pointer;
    transition: all 200ms;
}

button:hover{
    transform: translateY(-0.5rem);
    box-shadow: 0 0.5rem 0 var(--dark);
}

button:active{
    transform: translateY(0rem);
    box-shadow: 0 0 0;
}
</style>