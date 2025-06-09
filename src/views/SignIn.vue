<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const user = inject('user')

const state = ref('login')

function changeState(){
    state.value = state.value === 'login' ? 'signup' : 'login'
    console.log(state.value)
}

async function handleSubmit(e){
    e.preventDefault();
    
    const username = e.target.querySelector('#username').value
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value
    const passwordHash = btoa(password)

    try{
        const response = await fetch('http://localhost:3000/api/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        if (!response.ok){
            throw new Error('HTTP error! status: ' + response.status)
        }

        const data = await response.json()
        console.log(data)
    } catch (err) {

    } finally {

    }
}
</script>

<template>
    <header>
        <h1 v-if="state === 'login'">Log In</h1>
        <h1 v-else>Sign Up</h1>
    </header>
    <main>
        <form action="">
            <div class="inputs">
                <div class="input-section">
                    <label for="username">Username</label>
                    <input type="text" id="username">
                </div>
                <div class="input-section">
                    <label for="password">Password</label>
                    <input type="password" id="password">
                </div>
                <div v-if="state === 'signup'">
                    <label for="email">Email</label>
                    <input type="text" id="email">
                </div>
            </div>
            <div v-if="state === 'login'">
                <p>I dont have an account: <a @click="changeState">Sign Up</a></p>
                <button type="submit" class="style-btn">Log in</button>
            </div>
            <div v-if="state === 'signup'">
                <p>I have an account: <a @click="changeState">Log In</a></p>
                <button type="submit" class="style-btn">Sign up</button>
            </div>
        </form>
    </main>
</template>

<style>
</style>