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
    
</template>

<style>
</style>