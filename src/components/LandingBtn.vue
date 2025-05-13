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
    <button class="style-btn" @click="goto">
        {{ txt || 'Create Now' }}
    </button>
</template>

<style scoped>
.style-btn{
    font-size: 2rem;
    border-radius: 100vw;
    padding: 0.5rem 1rem;
}
</style>