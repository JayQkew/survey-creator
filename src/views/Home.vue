<script setup>
import SurveyCard from '../components/SurveyCard.vue'
import {ref} from 'vue'
const surveyDetails = [
  {
    title: "Survey Title 1",
    respondents: 10,
    questions: 5,
    date: "5 Jan 2025",
    active: true,
    link: "link1.com",
  },
  {
    title: "Survey Title 2",
    respondents: 25,
    questions: 10,
    date: "10 Feb 2025",
    active: false,
    link: "link2.com",
  },
  {
    title: "Survey Title 3",
    respondents: 15,
    questions: 7,
    date: "15 Mar 2025",
    active: true,
    link: "link3.com",
  },
    {
    title: "Survey Title 4",
    respondents: 30,
    questions: 12,
    date: "20 Apr 2025",
    active: false,
    link: "link4.com",
  },
  {
    title: "Survey Title 5",
    respondents: 20,
    questions: 8,
    date: "25 May 2025",
    active: true,
    link: "link5.com",
  }
];
</script>

<template>
    <header>
        <h1 class="page-heading">Home</h1>
        <p class="subheading">All your surveys on one page</p>
    </header>
    <main>

        <div class="survey-card-container">
            <ul>
                <SurveyCard v-for="s in surveyDetails" :survey="s" />
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
</style>