<template>
  <div id="wrapper">
    <InputForm @rerenderGraph="rerenderGraph"/>
    <KnowledgeGraph ref="graph"/>
    <PathToImprove id="path"/>
  </div>
</template>

<script>
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import InputForm from './components/InputForm.vue'
import PathToImprove from './components/PathToImprove.vue'


export default {
  name: 'App',
  components: {
    KnowledgeGraph, InputForm, PathToImprove
  },
  methods: {
    rerenderGraph() {
      this.$refs.graph.renderGraph();
    }
  }
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
#path {
  grid-column: span 3;
  width: 100%;
}
.subtitle p {
  font-style: italic;
}
</style>
