<script setup>
import { ref } from 'vue';

const props = defineProps({
    q: Object
})

const itemName = ref('')

function remove(item){
    const i = props.q.type_detail.indexOf(item)
    if(i > -1) props.q.type_detail.splice(i, 1)
}

function add(){
    if(itemName.value != '') props.q.type_detail.push(itemName.value)
    itemName.value = ''
}
</script>

<template>
   <ul>
    <li v-for="i in props.q.type_detail" :key="i">
        {{ i }}
        <button @click="remove(i)">x</button>
    </li>
   </ul>
   <input type="text" v-model="itemName">
   <button @click="add">Add</button>
</template>

<style>
</style>