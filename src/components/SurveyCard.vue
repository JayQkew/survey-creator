<script setup>
import { useRouter } from 'vue-router';
import copySvg from '../assets/copy-svgrepo-com.svg?raw';

const router = useRouter();
const props = defineProps({
    survey: Object
})

function copyLink(){
    navigator.clipboard.writeText('http://localhost:5173/res/'+props.survey.id)
}

function goToSurvey(){
    router.push({
        name:"survey-edit", 
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
                <button 
                    class="accent-btn sa-btn tc-btn mfs-btn " 
                    @click.stop="copyLink">
                    <div class="svg" v-html="copySvg"></div>
                </button>
            </header>
            <section class="container">
                <!-- <p>respondents: {{ survey.respondents }}</p> -->
                <!-- <p>questions: {{ survey.questions.length }}</p> -->
                <p>date: {{ survey.created_at }}</p>
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
    font-size: medium;
    margin: 0.25rem 0;
}

button{
    display: flex;
    align-items: center;
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
    transition: var(--transition);
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