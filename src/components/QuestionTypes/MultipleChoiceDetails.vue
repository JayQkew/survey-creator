<script setup>
import { ref } from 'vue';

const props = defineProps({
    q: Object
})

const items = ref([])
const itemName = ref('')

function remove(item){
    const index = props.q.typeDetail.indexOf(item)
    if(index > -1) props.q.typeDetail.splice(index, 1)
    // const i = items.value.indexOf(item)
    // if(i > -1) items.value.splice(i,1)
}

function add(){
    if(itemName.value != '') props.q.typeDetail.push(itemName.value)
    itemName.value = ''
}
</script>

<template>
   <ul>
    <li v-for="i in props.q.typeDetail" :key="i">
        {{ i }}
        <button @click="remove(i)">x</button>
    </li>
   </ul>
   <input type="text" v-model="itemName">
   <button @click="add">Add</button>
</template>

<style>
</style>