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
        const response = await fetch('http://localhost:3000/api/delete-from-list', { 
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
        
        const i = items.value.findIndex(i => i.id === item.id)
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
    <section>
        <ul>
             <li v-for="i in items" :key="i.id">
                 <div class="list-item">
                     {{ i.value }}
                     <button 
                        class="accent-btn rc-btn mfs-btn" 
                        @click="remove(i)">
                        x
                    </button>
                 </div>
             </li>
        </ul>
        <div class="add-item flex-ctr">
            <input 
                class="text-input tc-i sp-i sfs-i"
                type="text" 
                v-model="newItemName" 
                placeholder="option"
                @keyup.enter="add">
            <button 
                class="add-btn accent-btn gc-btn mfs-btn" 
                @click="add">
                Add
            </button>
         </div>
    </section>
</template>

<style scoped>
section{
    padding-right: 3rem;
}

ul{
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-left: 2rem;
}

.list-item{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
}

.add-item{
    margin-top: 1rem;
    height: 2rem;
    gap: 0.5rem;
}

input{
    height: 100%;
    padding-left: 0.5rem;
}

.add-btn{
    height: 100%;
}

</style>