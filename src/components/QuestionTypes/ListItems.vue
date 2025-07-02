<script setup>
import { inject, ref, computed } from 'vue';

const props = defineProps({
    q: Object
})

const { survey } = inject('survey')

const question = computed(() =>
    survey.value.questions.find((q) => q.id === props.q.id)
)
const newItemName = ref('')
console.log(question.answers)
const items = computed(() => question.value?.answers ?? [])

function remove(item){
    const i = items.value.findIndex(i => i.id === item.id)
    if(i > -1) {
        items.value.splice(i, 1)
        question.answers = items.value
        console.log(survey.value)
    }
}

function add(){
    const date = new Date()
    const newId = date.toString()
    if(newItemName.value != '') {
        items.value.push({
            id: newId,
            value: newItemName.value
        })

        question.answers = items.value
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