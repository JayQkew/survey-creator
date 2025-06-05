<script setup>
import Navbar from '../components/Navbar.vue'
import FooterComponent from '../components/Footer.vue'
</script>

<template>
    <div>
        <Navbar />
        <router-view />
        <FooterComponent />
    </div>
</template>