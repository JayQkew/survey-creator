<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const user = inject('user')

const route = useRoute()
const page = ref('landing')

if(route.fullPath === '/') page.value = 'landing'
else page.value = 'user'
</script>

<template>
    <nav>
        <section v-if="page !== 'landing'">
            <div>
                <router-link :to="{name: 'surveyor-home', params: {id: user.id}}">Home</router-link>
            </div>
            <div>
                <router-link :to="{name: 'create-survey', params: {id: user.id}}">Create</router-link>
            </div>
            <div>
                <router-link :to="{name: 'surveyor-about', params: {id: user.id}}">About</router-link>
            </div>
        </section>
        <div v-if="page === 'landing'">
            <router-link :to="{name: 'landing-page'}">Home</router-link>
        </div>
        <div v-if="page === 'landing'">
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



a:hover{
    background-color: var(--text-colour);
    color: var(--background-colour);
}
</style>