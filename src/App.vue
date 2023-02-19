<template>
  <div id="wrapper">
    <div @click="toggleForm" :class="{ active: formActive }" id="toggle-button">
      &#9654;
    </div>
    <InputForm
      @rerenderGraph="rerenderGraph"
      :style="{ left: formLeft }"
      id="input-form"
    />
    <KnowledgeGraph ref="graph" />
    <PathToImprove id="path" />
  </div>
</template>

<script>
import KnowledgeGraph from "./components/KnowledgeGraph.vue";
import InputForm from "./components/InputForm.vue";
import PathToImprove from "./components/PathToImprove.vue";

export default {
  name: "App",
  components: {
    KnowledgeGraph,
    InputForm,
    PathToImprove,
  },
  methods: {
    rerenderGraph() {
      this.$refs.graph.renderGraph();
    },
    toggleForm() {
      this.formActive = !this.formActive;
      if (this.formLeft === "-360px") {
        this.formLeft = "0";
      } else {
        this.formLeft = "-360px";
      }
    },
  },
  data() {
    return {
      formActive: false,
      formLeft: "-360px",
    };
  },
};
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
  place-items: center;
}
#path {
  grid-column: span 3;
  width: 100%;
}
.subtitle p {
  font-style: italic;
}
#input-form {
  position: fixed;
  top: 0;
  transition: all 0.5s ease;
  background-color: #fff;
  height: 100vh;
  background: #38ef7d;
}

#toggle-button {
  position: fixed;
  top: 44%;
  left: 0;
  background-color: #11998e;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  height: 50px;
  display: grid;
  place-items: center;
  font-size: .75rem;
}

#toggle-button.active {
  transform: translateX(350px) rotate(180deg);
}
</style>
