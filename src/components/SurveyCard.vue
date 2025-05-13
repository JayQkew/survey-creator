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
            <h2>{{ survey.title }}</h2>
            <p>respondents: {{ survey.respondents }}</p>
            <p>questions: {{ survey.questions }}</p>
            <p>date: {{ survey.date }}</p>
            <div>
                <label for="active">active</label>
                <input type="checkbox" id="active" :checked="survey.active">
            </div>
            <button class="style-btn" @click="copyLink"><div class="svg" v-html="copySvg"></div></button>
        </section>
    </li>
</template>

<style scoped>
section{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    border: 3px solid var(--dark);
    border-radius: 1.5rem;
    padding: 0.5rem;
}

h2{
    margin: 0px;
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
</style>