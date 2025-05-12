<script setup>
import FooterArea from '../components/Footer.vue'
</script>

<template>
    <div class="top-bar">
        <button class="cta-btn">Create Now</button>
    </div>
    <header>
        <h1>Welcome to SurveySurfer</h1>
        <p>quick and easy surveys for your convenience</p>
    </header>
    <main>
        <section>
            <h2>Make Surveys</h2>
            <p>a quick, easy, and simple</p>
        </section>
        <section>
            <h2>Easy Distribution</h2>
            <p>we provide a link to your survey for easy distribution</p>
        </section>
        <section>
            <h2>Review Data</h2>
            <p>see all the results desplayed on graphs for better visual understanding</p>
        </section>
    </main>
    <FooterArea />
</template>

<style scoped>
.top-bar{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.cta-btn{
    font-size: 1.5rem;
    font-weight: 600;
    background-color: white;
    color: #242424;
    border-radius: 100vw;
    padding: 0.5rem;
}
</style>