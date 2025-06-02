<script setup>
import FooterArea from '../components/Footer.vue'
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
    <header>
        <h1>Welcome to <span>EasySurvey</span></h1>
        <p>Surveys at your convenience</p>
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
        <div>
            <LandingBtn/>
        </div>
    </main>
    <SignIn v-if="showSignIn" @close="closeSignIn" @submit="handleSignIn"/>
    <FooterArea />
</template>

<style scoped>
header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 50rem;
    width: 100%;
}

header p{
    font-family: 'Ubuntu', monospace;
    font-size: 2.5rem;
    margin: 1rem;
}

h1{
    font-family: 'Ubuntu Bold', monospace;
    font-size: 7.5rem;
    margin: 0.5rem;
}

h1 span{
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.15rem;
}

h2{
    font-family: 'Ubuntu Bold', monospace;
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
    flex-direction: column;
    gap: 1rem;
}
</style>