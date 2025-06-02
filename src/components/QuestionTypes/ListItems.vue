<script setup>
import { ref } from 'vue';

const props = defineProps({
    q: Object
})

const newItemName = ref('')
const items = ref(JSON.parse(props.q.type_detail).options)
const loading = ref(false)
const error = ref(null)

console.log(items.value)

function remove(item){
    const i = items.value.indexOf(item)
    if(i > -1) items.value.splice(i,1)

    
}

async function add(){
    const newId = 'opt_' + Date.now()
    loading.value = true
    error.value = null

    if(newItemName.value != '') items.value.push({
        id: newId,
        value: newItemName.value
    })

    try{
        const response = await fetch('http://localhost:3000/api/add-to-list', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: props.q.id, value: {
                id: newId,
                value: newItemName.value
            }})
        })
        if(!response.ok){
            throw new Error('HTTP error! status: ' + response.status)
        }
        console.log(response.json())
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
        newItemName.value = ''
    }
}
</script>

<template>
   <ul>
    <li v-for="i in items" :key="i.id">
        {{ i.value }}
        <button @click="remove(i)">x</button>
    </li>
   </ul>
   <input type="text" v-model="newItemName">
   <button @click="add">Add</button>
</template>

<style>
</style>