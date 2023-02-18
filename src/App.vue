<template>
  <div id="wrapper">
    <KnowledgeGraph/>
    <InputForm/>
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
</style>
