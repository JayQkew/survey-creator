<script setup>
const emit = defineEmits(['close', 'submit'])

function handleClose() {
    emit('close')
}

function handleSubmit(e) {
    e.preventDefault()
    emit('submit')
}
</script>

<template>
    <form @submit="handleSubmit">
        <h2>Log-in</h2>
        <div class="inputs">
            <div class="input-section">
                <label for="username">Username</label>
                <input type="text" id="username">
            </div>
            <div class="input-section">
                <label for="password">Password</label>
                <input type="password" id="password">
            </div>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <button type="submit" class="style-btn">Submit</button>
            <button type="button" class="style-btn" @click="handleClose">Close</button>
        </div>
    </form>
</template>

<style scoped>
form{
    position: sticky;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid black;
    width: fit-content;
    border-radius: 1rem;
    background-color: var(--tan);
}

h2{
    padding: 0;
    margin-top: 0;
    margin-bottom: 1rem;
}

.inputs{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.style-btn {
    font-size: 1rem;
    border-radius: 100vw;
    padding: 0.5rem 1rem;
}
</style>