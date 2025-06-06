<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const user = inject('user')

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
    <h1>Sign-up</h1>
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
            <div>
                <label for="email">Email</label>
                <input type="text" id="email">
            </div>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <button type="submit" class="style-btn">Submit</button>
        </div>
    </form>
</template>

<style>
</style>