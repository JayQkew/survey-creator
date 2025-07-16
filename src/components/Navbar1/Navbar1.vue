<script setup>
import '../Navbar1/style.css'
import Logo from '../Logo.vue'
</script>

<template>
    <nav>
        <Logo/>
        <ul>
            <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">Home</router-link>
            <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">Browse</router-link>
            <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">Leaderboard</router-link>
            <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">Contact Us</router-link>
            <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">About Us</router-link>
        </ul>
    </nav>
</template>