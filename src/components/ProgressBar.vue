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
    return denominator > 0 ? Math.round((numerator / denominator) * 100) : 0;
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
        {{ percentage }}%
    </div>

</div>
</template>

<style scoped>
.progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 20px;
    background-color: #76c7c0;
    text-align: center;
    line-height: 20px;
    color: white;
    transition: width 0.3s ease-in-out;
}
</style>