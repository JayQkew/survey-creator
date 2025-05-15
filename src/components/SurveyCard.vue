<script setup>
import { useRouter } from 'vue-router';
import copySvg from '../assets/copy-svgrepo-com.svg?raw';

const router = useRouter();
const props = defineProps({
    survey: Object
})

function copyLink(){
    navigator.clipboard.writeText(props.survey.link)
}

function goToSurvey(){
    router.push({
        name:"survey-details", 
        params: {
            surveyId: props.survey.id
        }
    })
}
</script>

<template>
    <li>
        <section class="card" @click="goToSurvey">
            <header>
                <h2>{{ survey.title }}</h2>
                <button class="style-btn" @click.stop="copyLink"><div class="svg" v-html="copySvg"></div></button>
            </header>
            <section class="container">
                <p>respondents: {{ survey.respondents }}</p>
                <p>questions: {{ survey.questions.length }}</p>
                <p>date: {{ survey.date }}</p>
                <p v-if="survey.active">active</p>
                <p v-else="survey.active">unactive</p>
            </section>
        </section>
    </li>
</template>

<style scoped>
header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem
}

section{
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    border: 3px solid var(--dark);
    border-radius: 1.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
}

h2{
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    margin: 0;
    padding-left: 0.5rem;
    flex-grow: 1;
    border: 3px solid var(--dark);
    border-radius: 1rem;
}

p{
    font-size: 1.25rem;
    margin: 0.25rem 0;
}

label{
    font-size: 1.25rem;
    margin: 0.25rem 0;
}

.style-btn{
    display: flex;
    align-items: center;
    font-size: 1rem;
    border-radius: 1rem;
    padding: 0.5rem;
    height: 100%;
}

.svg{
    width: 2rem;
    height: 2rem;
}

.container{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    border: 3px solid var(--dark);
    border-radius: 1rem;
}

.card{
    cursor: pointer;
    transform: translateY(0);
    box-shadow: 0 0 0;
    transition: all 200ms;
}

.card:hover{
    transform: translateY(-0.5rem);
    box-shadow: 0 0.5rem 0 var(--dark);
}

.card:active{
    transform: translateY(0);
    box-shadow: 0 0 0;
}
</style>