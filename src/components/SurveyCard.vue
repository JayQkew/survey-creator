<script setup>
import copySvg from '../assets/copy-svgrepo-com.svg?raw';
const props = defineProps({
    survey: Object
})

function copyLink(){
    navigator.clipboard.writeText(props.survey.link)
}
</script>

<template>
    <li>
        <section>
            <header>
                <h2>{{ survey.title }}</h2>
                <button class="style-btn" @click="copyLink"><div class="svg" v-html="copySvg"></div></button>
            </header>
            <section class="container">
                <p>respondents: {{ survey.respondents }}</p>
                <p>questions: {{ survey.questions }}</p>
                <p>date: {{ survey.date }}</p>
                <div>
                    <label for="active">active</label>
                    <input type="checkbox" id="active" :checked="survey.active">
                </div>
            </section>
        </section>
    </li>
</template>

<style scoped>
header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.5rem
}

section{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    border: 3px solid var(--dark);
    border-radius: 1.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
}

h2{
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: flex-start;
    align-items: center;
    margin: 0px;
    padding-left: 0.5rem;
    flex-grow: 2;
    border: 3px solid var(--dark);
    border-radius: 1rem;
}

p{
    margin: 0.25rem 0px;
}

.style-btn{
    font-size: 1rem;
    border-radius: 1rem;
    padding: 0.5rem;
}

.svg{
    width: 2rem;
    height: 2rem;
}

.container{
    display: flex;
    border: 3px solid var(--dark);
    border-radius: 1rem;
    flex-grow: 2;
}
</style>