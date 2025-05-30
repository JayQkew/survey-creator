<script setup>
import { ref } from 'vue';

const props = defineProps({
    q: Object
})

const itemName = ref('')
const items = ref(JSON.parse(props.q.type_detail).options)

console.log(items.value)

function remove(item){
    const i = items.value.indexOf(item)
    if(i > -1) items.value.splice(i,1)
}

function add(){
    const newId = 'opt_' + Date.now()
    if(itemName.value != '') items.value.push({
        id: newId,
        value: itemName.value,
        checked: false
    })
    itemName.value = ''
}
</script>

<template>
   <ul>
    <li v-for="i in items" :key="i.id">
        {{ i.value }}
        <button @click="remove(i)">x</button>
    </li>
   </ul>
   <input type="text" v-model="itemName">
   <button @click="add">Add</button>
</template>

<style>
</style>