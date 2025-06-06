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

    const userData = {
        username: username,
        email: email,
        password: passwordHash
    }

    try{
        
    } catch (err) {

    } finally {

    }
}
</script>

<template>
    
</template>

<style>
</style>