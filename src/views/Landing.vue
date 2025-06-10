<script setup>
import LandingBtn from '../components/LandingBtn.vue'
import SignIn from '../components/SignIn.vue';
import { ref } from 'vue'

const showSignIn = ref(false)
function openSignIn() {
    showSignIn.value = true
}
function closeSignIn() {
    showSignIn.value = false
}
</script>

<template>
    <SignIn v-if="showSignIn" @close="closeSignIn"/>
    <header>
        <h1>Surveys at your<br>Convenience</h1>
        <p>Make surveys in the blink of an eye</p>
        <LandingBtn txt="Log In" @show-signin="openSignIn"/>
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
header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 75vh;
    width: 100%;
}

header h1{
    font-size: 5rem;
}

header p{
    font-size: 1.5rem;
    margin: 1rem;
}


h1 span{
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.15rem;
}

h2{
    font-size: 4rem;
}

p{
    font-size: 2rem;
}

section{
    border: 3px solid var(--dark);
    border-radius: 1rem;
}

main{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>