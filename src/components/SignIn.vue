<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['close', 'submit'])
const user = inject('user')
function handleClose() {
    emit('close')
}

async function handleSubmit(e) {
    e.preventDefault()
    emit('submit')

    const username = e.target.querySelector('#username').value
    const password = e.target.querySelector('#password').value
    const passwordHash = btoa(password)

    const userData = {
        username: username,
        password: passwordHash
    }

    console.log(userData)


    try{
        const response = await fetch('http://localhost:3000/api/log-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: passwordHash
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const _user = await response.json()
        console.log(_user.id)
        user.value = userData
        router.push({
            name: 'surveyor-home',
            params: {id: String(_user.id)}
        })

    } catch (err) {
        console.error('Error during login:', err)
    } finally {
        handleClose()
    }
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: var(--border);
    width: fit-content;
    background-color: var(--background-colour);
    color: var(--text-colour);
}

.input-section{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
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