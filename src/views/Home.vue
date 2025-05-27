<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {inject, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const user = inject('user')

const surveys = ref(null)
const loading = ref(true)
const error = ref(null)

function goToNewSurvey(){
    router.push({ name: 'create-survey' })
}

async function fetchData(){
  loading.value = true
  error.value = null
  try{
    const response = await fetch(`http://localhost:3000/api/user-surverys`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user: user.value })
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    surveys.value = await response.json()
  } catch (e){
    error.value = e
  } finally{
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
    <header>
        <h1 class="page-heading">Home</h1>
        <p class="subheading">All your surveys on one page</p>
    </header>
    <main>
        <div class="survey-card-container">
            <ul>
                <SurveyCard v-for="s in surveys" :survey="s" />
                <button class="style-btn" @click="goToNewSurvey"> + </button>
            </ul>
        </div>
    </main>
</template>

<style scoped>
ul{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    list-style: none;
    margin: 0 4rem;
    padding: 0;
}

.style-btn{
  border-radius: 1.5rem;
  font-size: 5rem;
}
</style>