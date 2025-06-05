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
    width: 100%;
    height: 4rem;
}
ul{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
}
li{
    display: flex;
    padding: 0px;
    margin: 0px;
}
</style>