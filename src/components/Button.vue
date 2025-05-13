<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
    txt: String
})

const router = useRouter()

</script>

<template>
    <button class="style-btn">
        {{ txt || 'Button' }}
    </button>
</template>

<style scoped>
</style>