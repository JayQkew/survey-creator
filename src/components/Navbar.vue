<script setup>
import { inject } from 'vue';

const user = inject('user')
</script>

<template>
    <nav>
        <ul>
            <li>
                <router-link :to="{name: 'surveyor-home', params: {id: user.id}}">Home</router-link>
            </li>
            <li>
                <router-link :to="{name: 'create-survey', params: {id: user.id}}">Create</router-link>
            </li>
            <li>
                <router-link :to="{name: 'surveyor-about', params: {id: user.id}}">About</router-link>
            </li>
        </ul>
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
}
ul{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    border-bottom: var(--border);
}

li{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    width: 7.5rem;
    height: 100%;
    border-right: var(--border);
}

li a{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-colour);
    width: 100%;
    height: 100%;
    transition: all 0.2s;
}

li:hover a{
    background-color: var(--text-colour);
    color: var(--background-colour);
}
</style>