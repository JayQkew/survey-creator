<script setup>
import FooterArea from '../components/Footer.vue'
</script>

<template>
    <header>
        <h1>Welcome to <span>SurveySage</span></h1>
        <p>Surveys at your convenience</p>
    </header>
    <main>
        <section>
            <h2><span class="blue-font">Make</span> Surveys</h2>
            <p>a quick, easy, and simple</p>
        </section>
        <section>
            <h2>Easyily <span class="red-font">Distribute</span></h2>
            <p>we provide a link to your survey for easy distribution</p>
        </section>
        <section>
            <h2><span class="yellow-font">Review</span> Data</h2>
            <p>see all the results desplayed on graphs for better visual understanding</p>
        </section>
    </main>
    <FooterArea />
</template>

<style scoped>
header{
    display: flex;
    place-content: center;
    flex-direction: column;
    height: 50rem;
    width: 100%;
}

header p{
    font-family: 'Erode-Medium', sans-serif;
    font-size: 2.5rem;
    margin: 1rem;
}

h1{
    font-family: 'Erode-Bold', sans-serif;
    font-size: 7.5rem;
    margin: 0.5rem;
}

h1 span{
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.15rem;
}

h2{
    font-family: 'Erode-Semibold', sans-serif;
    font-size: 4rem;
}

p{
    font-size: 2rem;
}

section{
    border: 3px solid var(--dark);
    border-radius: 1rem;
}

main{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.red-font{
    color: var(--red);
}

.blue-font{
    color: var(--blue);
}

.yellow-font{
    color: var(--yellow);
}

</style>