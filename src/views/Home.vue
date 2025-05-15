""<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router';
import surveyData from '../survey-data.json'
const router = useRouter()

const surveyDetails = [
  {
    id: '000',
    title: "Survey Title 1",
    respondents: 10,
    questions: 5,
    date: "5 Jan 2025",
    active: true,
    link: "link1.com",
  },
  {
    id: '001',
    title: "Survey Title 2",
    respondents: 25,
    questions: 10,
    date: "10 Feb 2025",
    active: false,
    link: "link2.com",
  },
  {
    id: '002',
    title: "Survey Title 3",
    respondents: 15,
    questions: 7,
    date: "15 Mar 2025",
    active: true,
    link: "link3.com",
  },
  {
    id: '003',
    title: "Survey Title 4",
    respondents: 30,
    questions: 12,
    date: "20 Apr 2025",
    active: false,
    link: "link4.com",
  },
  {
    id: '004',
    title: "Survey Title 5",
    respondents: 20,
    questions: 8,
    date: "25 May 2025",
    active: true,
    link: "link5.com",
  }
];

const surveys = ref(null)
const loading = ref(true)
const error = ref(null)

function goToNewSurvey(){
    router.push({ name: 'create-survey' })
}

onMounted(() => {
  try{
    surveys.value = surveyData
  } catch (err){
    error.value = `Failed to load data: ${err.message}`
  } finally{
    loading.value = false
  }
})
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