<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function handleGetStarted(){
    router.push({ name: 'sign-in-page' })
}
</script>

<template>
    <header>
        <div>
            <h1>Surveys at your<br>Convenience</h1>
            <p>Make surveys in the blink of an eye</p>
            <LandingBtn txt="Get Started" @show-signin="openSignIn"/>
            <button class="style-btn" @click="handleGetStarted">Get Started</button>
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
header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 100%;
}

header h1{
    font-size: 5rem;
    margin: 1rem;
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
    margin-top: 0;
    font-size: 2rem;
    width: 100%;
}

p{
    margin-bottom: 0;
    font-size: 1rem;
    width: 100%;
}

section{
    box-sizing: border-box;
    border: var(--border);
    border-radius: 0.25rem;
    width: 100%;
    padding: 1rem;
    transition: all 0.3s;
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
}

.style-btn{
    font-size: 1.5rem;
    border-radius: 0.25rem;
    padding: 0.5rem 2rem;
}
</style>