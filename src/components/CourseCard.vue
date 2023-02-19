<template>
  <div class="card">
    <h2>{{ courseArray[0] }}</h2>
    <iframe width="400" height="285" :src="courseArray[2]"></iframe>
    <p class="subtitle">Current Proficiency: {{ courseArray[1]*100+'%' }}</p>
  </div>
</template>

<script>
export default {
    props: ['courseArray'],
};
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: #353535; */
    font-size: 1rem;
    /* color: #fff; */
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    transition: all 500ms;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #514167;
    max-width: 400px;
 }
p.subtitle {
font-style: italic
}
</style>
