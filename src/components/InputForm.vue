<template>
  <div id="wrapper">
    <form class="add-form">
      <div class="form-control">
        <label> Topic </label>
        <input type="text" v-model="id" name="id" placeholder="Add Topic" />
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
          type="number"
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
  data() {
      return {
        id: "",
        prereqs: "",
        link: "",
        mastery: "",
        store: useStore(),
      };
    },
  methods: {
    addNode() {

        if (!this.id || !this.prereqs || !this.mastery) {
          alert("Please input information for topic, prerequisites, and mastery level ");
          return;
        }

        if (this.mastery > 1 || this.mastery < 0) {
          alert("Please enter a mastery level that is greater than zero and less than one");
          return;
        }

        const newNode = {
                id: this.id,
                prereqs: this.prereqs,
                link: this.link,
                mastery: this.mastery,
            };
            var prereqsArray = this.prereqs.split(',');
            if (this.link == "") {
              this.store.data.nodes.push({id: newNode.id, mastery: newNode.mastery, prerequisites: prereqsArray, link: null})
            }
            else {
              this.store.data.nodes.push({id: newNode.id, mastery: newNode.mastery, prerequisites: prereqsArray, link: this.link})
            }
            
            console.log({id: newNode.id, mastery: newNode.mastery, prerequisites: prereqsArray, link: null})
            this.id = "",
            this.prereqs = "",
            this.link = "",
            this.mastery=""

        }
  
    }
}
    
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
  color: rgb(255, 255, 255);
  border: none;
  background-color: rgb(16, 72, 118);
  font-weight: 800;
  transition: all 0.2s;
  margin-top: 18px;
}
#btn:hover {
  background-color: rgb(0, 0, 0);
  color: white;
}
</style>
