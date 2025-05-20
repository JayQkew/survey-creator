<script setup>
import { ref } from 'vue';

const items = ref([])
const itemName = ref('')

function remove(item){
    const i = items.value.indexOf(item)
    if(i > -1) items.value.splice(i,1)
}

function add(){
    if(itemName.value != '') items.value.push(itemName.value)
    itemName.value = ''
}
</script>

<template>
   <ul>
    <li v-for="i in items" :key="i">
        {{ i }}
        <button @click="remove(item)">x</button>
    </li>
   </ul>
   <input type="text" v-model="itemName">
   <button @click="add">Add</button>
</template>

<style>
</style>