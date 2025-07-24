<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import modeSvg from '../assets/circle-half-stroke-solid.svg?raw'
import Logo from './Logo.vue';

const user = inject('user')

const route = useRoute()
const page = ref('')

if(route.fullPath === '/') page.value = 'landing'
else if(route.name === 'respondent') page.value = 'res'
else page.value = 'user'

function lightMode(){
    document.body.className = document.body.className === 'light' ?
        'dark' :
        'light'
}
</script>

<template>
    <nav>
        <Logo/>
        <div class="flex-ctr">
            <ul>
                <router-link class="flex-ctr" :to="{name: 'landing'}">Home</router-link>
                <router-link class="flex-ctr" :to="{name: 'browse'}">Browse</router-link>
                <router-link class="flex-ctr" :to="{name: 'leaderboard'}">Leaderboard</router-link>
                <router-link class="flex-ctr" :to="{name: 'contact-us'}">Contact Us</router-link>
                <router-link class="flex-ctr" :to="{name: 'about-us'}">About Us</router-link>
            </ul>
            <section class="flex-ctr">
                <button class="flex-ctr" @click="lightMode">
                    <div class="svg" v-html="modeSvg"></div>
                </button>
            </section>
            <div>
                <router-link class="flex-ctr" :to="{name: 'sign-in'}">Sign In</router-link>
                <router-link class="flex-ctr" :to="{name: 'register'}">Register</router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    margin: 1rem;
    border: var(--border);
    border-radius: 0.5rem;
    position: sticky;
    top: 1rem;
    z-index: 3;
    background-color: var(--background-colour);
    color: var(--text-colour);
}



section{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    height: 100%;
}

.other{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    padding: 0;
    margin: 0;
    height: 100%;
}

button{
    font-family: var(--regular-font);
    background-color: var(--background-colour);
    color: var(--text-colour);
    border-radius: 0.25rem;
    border: none;
    width: 3rem;
    height: 3rem;
    padding: 0px;
    margin: 0.5rem;
    transition: var(--transition);
}
button:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}

a{
    font-weight: bold;
    color: var(--text-colour);
    height: 3rem;
    padding-inline: 1rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    transition: var(--transition);
}

a:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}

.svg{
    color: currentColor;
    width: 1.5rem;
    height: 1.5rem;
    pointer-events: none;
}

.svg svg{
    fill: currentColor;
    stroke: currentColor;
}
</style>