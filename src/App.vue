<template>
  <div id="wrapper">
    <InputForm/>
    <KnowledgeGraph/>
  </div>
</template>

<script>
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import InputForm from './components/InputForm.vue'


export default {
  name: 'App',
  components: {
    KnowledgeGraph, InputForm
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center;
}
</style>
