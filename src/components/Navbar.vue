<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import modeSvg from '../assets/circle-half-stroke-solid.svg?raw'

const user = inject('user')

const route = useRoute()
const page = ref('landing')

if(route.fullPath === '/') page.value = 'landing'
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
            <div>
                <router-link :to="{name: 'surveyor-home', params: {id: user.id}}">Home</router-link>
            </div>
            <div>
                <router-link :to="{name: 'surveyor-about', params: {id: user.id}}">About</router-link>
            </div>
        </section>
        <button v-if="page === 'user'" @click="lightMode">
            <div class="svg" v-html="modeSvg"></div>
        </button>
        <div  v-if="page === 'landing'">
            <router-link :to="{name: 'landing-page'}">Home</router-link>
        </div>
        <div  v-if="page === 'landing'" class="other">
            <button @click="lightMode">
                <div class="svg" v-html="modeSvg"></div>
            </button>
            <router-link :to="{name: 'sign-in-page'}">Sign In</router-link>
        </div>
    </nav>
</template>

<style scoped>
nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    border-bottom: var(--border);
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-colour);
    border-radius: 0;
    border: none;
    width: 4rem;
    height: 4rem;
    padding: 0px;
    margin: 0px;
    transition: all 0.2s;  
}

button:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}

a{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-colour);
    border-right: var(--border);
    width: 7.5rem;
    height: 4rem;
    padding: 0px;
    margin: 0px;
    transition: all 0.2s;
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