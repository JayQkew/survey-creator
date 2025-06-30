<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {inject, onMounted, ref} from 'vue'

const user = inject('user')
const props = defineProps({
  id: String
})

const surveys = ref(null)
const loading = ref(true)
const error = ref(null)

async function addNewSurvey(){
    loading.value = true
    error.value = null

    const date = new Date();
    const formatted = date.toISOString().substring(0, 10);
    try{
      const response = await fetch('http://localhost:3000/api/add-survey', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          surveyorId: user.value.id,
          date: formatted
        })
      })
      
      const data = await response.json()
      fetchData();
      console.log(data)
    } catch (err){
      error.value = err
    } finally {
      loading.value = false
    }
}

async function fetchData(){
  loading.value = true
  error.value = null
  try{
    const response = await fetch(`http://localhost:3000/api/user-surveys`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user: user.value })
    })
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    surveys.value = await response.json()
    console.log(surveys.value)
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
                <button 
                  class="style-btn accent-btn la-btn tc-btn" 
                  @click="addNewSurvey">
                   + 
                  </button>
            </ul>
        </div>
    </main>
</template>

<style scoped>
main{
  box-sizing: border-box;
  width: 100%;
}

.survey-card-container{
  box-sizing: border-box;
  width: 100%;
}

ul{
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.style-btn{
  border-radius: 0.5rem;
  font-size: 5rem;
}

main{
  margin: 0;
}
</style>