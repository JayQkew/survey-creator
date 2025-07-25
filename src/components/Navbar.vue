<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import modeSvg from '../assets/circle-half-stroke-solid.svg?raw'
import Logo from './Logo.vue';

const user = inject('user', null)

const route = useRoute()

function lightMode(){
    document.body.className = document.body.className === 'light' ?
        'dark' :
        'light'
}
</script>

<template>
    <nav>
        <Logo/>
        <div class="flex-ctr btn-container">
            <ul class="flex-ctr-r">
                <li>
                    <router-link class="flex-ctr" :to="{name: 'landing'}">Home</router-link>
                </li>
                <li>
                    <router-link class="flex-ctr" :to="{name: 'browse'}">Browse</router-link>
                </li>
                <li>
                    <router-link class="flex-ctr" :to="{name: 'leaderboard'}">Leaderboard</router-link>
                </li>
                <li>
                    <router-link class="flex-ctr" :to="{name: 'contact-us'}">Contact Us</router-link>
                </li>
                <li>
                    <router-link class="flex-ctr" :to="{name: 'about-us'}">About Us</router-link>
                </li>
            </ul>
            <section class="flex-ctr">
                <button class="flex-ctr" @click="lightMode">
                    <div class="svg" v-html="modeSvg"></div>
                </button>
            </section>
            <div class="flex-ctr-r btn-container">
                <router-link class="flex-ctr sign-in" :to="{name: 'sign-in'}">Sign In</router-link>
                <router-link class="flex-ctr register" :to="{name: 'register'}">Register</router-link>
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
    height: 6rem;
    padding-inline: 1rem;
    border-bottom: var(--border-width) var(--light-grey);
    position: sticky;
    top: 0rem;
    z-index: 3;
    background-color: var(--background-colour);
    color: var(--text-colour);
}

ul{
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.25rem;
}

section{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
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
    color: var(--text-colour);
    height: 2rem;
    padding-inline: 0.5rem;
    border-radius: 0.25rem;
    transition: var(--transition);
}
a:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}

.sign-in{
    color: var(--background-colour);
    background-color: var(--blue-2);
    border: 2px solid var(--blue-2);
}
.sign-in:hover{
    color: var(--blue-2);
    background-color: var(--background-colour);
}

.register{
    color: var(--background-colour);
    background-color: var(--orange);
    border: 2px solid var(--orange);

}
.register:hover{
    color: var(--orange);
    background-color: var(--background-colour);
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

.btn-container{
    gap: 0.5rem;
}

</style>