<template>
  <div id="wrapper">
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label> Topic </label>
        <input type="text" v-model="text" name="text" placeholder="Add Topic" />
      </div>
      <div class="form-control">
        <label> Prerequisites </label>
        <input
          type="text"
          v-model="prereqs"
          name="prereqs"
          placeholder="Add Prerequisites"
        />
      </div>
      <div class="form-control">
        <label> Link </label>
        <input type="text" v-model="link" name="link" placeholder="Add Link" />
      </div>
      <div class="form-control">
        <label> Mastery Level </label>
        <input
          type="float"
          v-model="mastery"
          name="mastery"
          placeholder="Add Mastery Level"
        />
      </div>
      <button id="btn" @click.prevent="addNode">Add Node</button>
    </form>
  </div>
</template>

<script>
import { useStore } from "@/pinia/store";
export default {
  methods: {
    data() {
      return {
        text: "",
        prereqs: "",
        link: "",
        mastery: "",
        store: useStore(),
      };
    },

    onsubmit(e) {
      e.preventDefault();

      if (!this.text || !this.prereqs || !this.link || !this.mastery) {
        alert("Please fill out all sections ");
        return;
      }

      const newNode = {
        text: this.text,
        prereqs: this.prereqs,
        link: this.link,
        mastery: this.mastery,
      };
      console.log(newNode);
      (this.text = ""), (this.prereqs = "");
      (this.link = ""), (this.mastery = "");
    },

    displayNodeData(node) {
      this.selectedNode = node;
      console.log(this.selectedNode);
    },
    addNode() {
      // this.store.data.nodes.push({
      //   id: "Test",
      //   prerequisites: ["Thermodynamics", "Electromagnetism"],
      // });
      // d3.select("svg").remove();
      // this.renderGraph();
      console.log("hi");
    },
  },
};
</script>

<style scoped>
#wrapper {
  width: 300px;
  height: auto;
  display: flex;
  justify-content: center;
}
.form-control {
  margin: 5px;
}
.form-control input {
  margin: 5px;
  width: 100%;
  padding-top: 3px;
  padding-bottom: 3px;
}
.form-control label {
  letter-spacing: 1px;
  font-weight: 500;
}
#btn {
  margin: 5px;
  width: 50%;
  letter-spacing: 1px;
  border-radius: 7px;
  padding: 5px;
  background-color: rgb(0, 75, 137);
  border: none;
  box-shadow: 3px 5px rgb(65, 65, 65);
  color: white;
  font-weight: 800;
  transition: all 0.2s;
  margin-top: 18px;
}
#btn:hover {
  box-shadow: 1px 2px rgb(65, 65, 65);
  transform: translate(1px, 2px);
}
</style>
