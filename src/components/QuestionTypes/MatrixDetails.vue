<script setup>
import { ref } from 'vue';

const props = defineProps({
    q: Object
})

const itemName = ref('')

console.log(props.q.typeDetail)

function remove(item){
    const i = props.q.typeDetail.indexOf(item)
    if(i > -1) props.q.typeDetail.splice(i,1)
}

function add(){
    const newId = 'opt_' + Date.now()
    if(itemName.value != '') props.q.typeDetail.push({
        id: newId,
        option: itemName.value,
        checked: false
    })
    itemName.value = ''
}
</script>

<template>
   <ul>
    <li v-for="i in props.q.typeDetail" :key="i.id">
        {{ i.option }}
        <button @click="remove(i)">x</button>
    </li>
   </ul>
   <input type="text" v-model="itemName">
   <button @click="add">Add</button>
</template>

<style>
</style>