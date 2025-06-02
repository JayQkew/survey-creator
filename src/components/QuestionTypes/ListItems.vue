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

async function remove(item){
    console.log('Removing item:', item)
    loading.value = true
    error.value = null

    try{
        const response = await fetch('http://localhost:3000/api/delete-from-list', { // Fixed: http instead of https
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({qId: props.q.id, id: item.id})
        })
        
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`)
        }
        
        const result = await response.json() // Fixed: await the response.json()
        console.log('Delete response:', result)
        
        // Only remove from local array if API call was successful
        const i = items.value.findIndex(i => i.id === item.id) // Fixed: use findIndex with id comparison
        if(i > -1) {
            items.value.splice(i, 1)
            console.log('Item removed from local array')
        }
        
    } catch (err){
        console.error('Remove error:', err)
        error.value = err.message
    } finally{
        loading.value = false
    }
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