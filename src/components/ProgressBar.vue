<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
    denominator: {
        type: Number,
        required: true
    },
    numerator: {
        type: Number,
        required: true
    }
})

const percentage = computed(() => {
    return props.denominator > 0 ? Math.round((props.numerator / props.denominator) * 100) : 0;
});

const barStyle = computed(() => {
    return {
        width: `${percentage.value}%`,
    };
});

onMounted(() => {
    if (props.denominator < 0 || props.numerator < 0) {
        console.error('Denominator and numerator must be non-negative numbers.');
    }
});
</script>

<template>
<div class="progress-bar-container">
    <div class="progress-bar" :style="barStyle">
        <p>
            {{ percentage }}% ({{ props.numerator }})
        </p>
    </div>
</div>
</template>

<style scoped>
.progress-bar-container {
    width: 100%;
    background-color: var(--background-colour);
    border: var(--border-width);
    border-color: var(--green);
    border-radius: 0.25rem;
    overflow: hidden;
}

.progress-bar {
    height: 1.25rem;
    background-color: var(--green);
    text-align: center;
    line-height: 1.25rem;
    color: var(--text-colour);
    height: 100%;   
    transition: width 0.3s ease-in-out;
}

p{
    margin: 0;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
}

</style>