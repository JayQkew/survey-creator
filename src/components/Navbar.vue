<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import modeSvg from '../assets/circle-half-stroke-solid.svg?raw'
// ../assets/logo/mojo-v3-2-color-text-dark-logo-only copy.png

const user = inject('user')

const route = useRoute()
const page = ref('landing')

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
        <section v-if="page === 'user'">
            <div class="logo-container flex-ctr">
                <img class="logo" src="../assets/logo/mojo-v3-2-color-text-dark-logo-only copy.png"/>
            </div>
            <div>
                <router-link class="flex-ctr" :to="{name: 'surveyor-home', params: {id: user.id}}">Home</router-link>
            </div>
            <div>
                <router-link class="flex-ctr" :to="{name: 'surveyor-about', params: {id: user.id}}">About</router-link>
            </div>
        </section>
        <div  v-if="page === 'landing'" class="flex-ctr-r">
            <div class="logo-container flex-ctr">
                <img class="logo" src="../assets/logo/mojo-v3-2-color-text-dark-logo-only copy.png"/>
            </div>
            <router-link class="flex-ctr" :to="{name: 'landing-page'}">Home</router-link>
        </div>
        <div  v-if="page === 'landing'" class="other">
            <button class="flex-ctr" @click="lightMode">
                <div class="svg" v-html="modeSvg"></div>
            </button>
            <router-link class="flex-ctr" :to="{name: 'sign-in-page'}">Sign In</router-link>
        </div>
        <section v-if="page === 'res'">
            <div class="logo-container flex-ctr">
                <img class="logo" src="../assets/logo/mojo-v3-2-color-text-dark-logo-only copy.png"/>
            </div>
            <router-link class="flex-ctr" :to="{name: 'landing-page'}">Mojo Surveys</router-link>
        </section>
        <button class="flex-ctr" v-if="page === 'user' || page === 'res'" @click="lightMode">
            <div class="svg" v-html="modeSvg"></div>
        </button>
    </nav>
</template>

<style scoped>
.logo-container{
    box-sizing: border-box;
    width: 7.5rem;
    height: 100%;
    padding: 0.5rem;
}

.logo{
    width: 100%;
}

nav{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    border: var(--border);
    border-radius: 0.5rem;
    margin: 1rem;
    position: relative;
    z-index: 2;
}

section{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
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
    border-radius: 0;
    border: none;
    width: 4rem;
    height: 4rem;
    padding: 0px;
    margin: 0px;
    transition: var(--transition);
}

button:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}

a{
    color: var(--text-colour);
    border-right: var(--border);
    width: 7.5rem;
    height: 4rem;
    padding: 0px;
    margin: 0px;
    transition: var(--transition);
}

nav div:last-child a{
    border-right: none;
    border-left: var(--border);
}

nav section div:last-child a{
    border-right: var(--border);
    border-left: none;
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