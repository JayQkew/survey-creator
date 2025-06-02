<script setup>
const props = defineProps({ txt: String })
const emit = defineEmits(['show-signin'])

function goto() {
    emit('show-signin')
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