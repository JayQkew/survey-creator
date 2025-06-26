<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function handleGetStarted(){
    router.push({ name: 'sign-in-page' })
}
</script>

<template>
    <div class="background">
        <img src="../assets/logo/mojo-v3-2-color-text-dark-logo-only copy.png"/>
    </div>
    <header class="flex-ctr-c">
        <div>
            <h1>Surveys at your<br>Convenience</h1>
            <p>Make surveys in the blink of an eye</p>
            <button 
                class="accent-btn gc-btn lp-btn lfs-btn" 
                @click="handleGetStarted">
                Get Started
            </button>
        </div>
    </header>
    <main>
        <section>
            <h2>Make Surveys</h2>
            <p>Quick, easy, and simple</p>
        </section>
        <section>
            <h2>Easy Distribution</h2>
            <p>We provide a link to your survey for easy distribution</p>
        </section>
        <section>
            <h2>Review Data</h2>
            <p>See all the results desplayed on graphs for better visual understanding</p>
        </section>
    </main>
</template>

<style scoped>
.background{
    box-sizing: border-box;
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}

img{
    position:relative;
    object-fit: cover;
    transform: translate(-5rem, -32.5rem)
}

header{
    height: 80vh;
    width: 100%;
    position: relative;
    z-index: 2;
}

h1{
    font-size: 5rem;
    margin: 1rem;
}

header p{
    font-size: x-large;
    margin: 1rem;
}

h2{
    margin-top: 0;
    font-size: xx-large;
    width: 100%;
}

p{
    margin-bottom: 0;
    font-size: medium;
    width: 100%;
}

section{
    box-sizing: border-box;
    border: var(--border);
    border-radius: 0.25rem;
    width: 100%;
    padding: 1rem;
    transition: var(--transition);
}

section:hover{
    flex-grow: 2;
    color: var(--background-colour);
    background-color: var(--text-colour);
}

main{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 10rem;
    position: relative;
    z-index: 2;
}
</style>