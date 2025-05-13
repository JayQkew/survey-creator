<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
    txt: String
})

const router = useRouter()

function goto(){
    router.push({
        name: 'surveyor-home',
        params: {id: '123'} //this is a temporary id
    })
}
</script>

<template>
    <button @click="goto">
        {{ txt || 'Create Now' }}
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
    margin: 3rem;
    border: 3px solid var(--dark);
    border-radius: 100vw;
    cursor: pointer;
    transition: all 200ms;
}

button:hover{
    transform: translateY(-10px);
    box-shadow: 0px 0.75rem 1px var(--dark);
}

button:active{
    transform: translateY(10px);
    box-shadow: 0 0 0;
}
</style>