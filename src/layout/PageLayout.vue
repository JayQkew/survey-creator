<script setup>
import Navbar from '../components/Navbar.vue'
import FooterComponent from '../components/Footer.vue'
</script>

<template>
    <div>
        <Navbar />
        <div class="main-content-page">
            <aside></aside>
            <main>
                <div class="main-container">
                    <router-view />
                </div>
            </main>
            <aside></aside>
        </div>
        <FooterComponent />
    </div>
</template>

<style scoped>
.main-content-page{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

aside{
    content: "";
}

main{
    box-sizing: border-box;
    width: 75%;
    margin: 0;
}

.main-container{
    min-height: 84vh;
    z-index: -100;
}
</style>