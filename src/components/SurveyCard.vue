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
                <!-- <p>respondents: {{ survey.respondents }}</p> -->
                <p>questions: {{ survey.questions.length }}</p>
                <p>date: {{ survey.date.split("T")[0] }}</p>
                <p v-if="survey.active == 1">active</p>
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
    gap: 0.5rem
}

li{
    box-sizing: border-box;
}

section{
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    border: var(--border);
    border-radius: 0.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
    width: 100%;
}

h2{
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    padding-left: 0.5rem;
    border: var(--border);
    border-radius: 0.25rem;
    height: 3rem;
    line-height: 3rem;
}

p{
    font-size: 1rem;
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
    border-radius: 0.25rem;
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
    align-items: flex-start;
    flex-direction: column;
    border: var(--border);
    border-radius: 0.25rem;
}

.card{
    cursor: pointer;
    transform: translateY(0);
    box-shadow: 0 0 0;
    transition: all 200ms;
}

.card:hover{
    transform: translateY(-0.5rem);
    box-shadow: 0 0.5rem 0 var(--text-colour);
}

.card:active{
    transform: translateY(0);
    box-shadow: 0 0 0;
}
</style>