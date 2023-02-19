<template>
  <div class="sidebar">
    <div class="form-wrapper">
      <h1 style="margin-bottom: 0px;"> Add a Node</h1>
      <input id="checkbox" type="checkbox" v-model="isProject"> Is this a project?
      <form class="add-form">
        <div style="margin-top: 20px;" class="form-control">
          <label > Topic or Project </label>
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
        <div v-if="!isProject" class="form-control">
          <label> Category </label>
          <input
            type="text"
            v-model="category"
            name="category"
            placeholder="Add Category"
          />
        </div>
        <div v-if="!isProject" class="form-control">
          <label> Link </label>
          <input type="text" v-model="link" name="link" placeholder="Add Link" />
        </div>
        <div v-if="!isProject" class="form-control">
          <label> Mastery Level </label>
          <input
            type="double"
            v-model="mastery"
            name="mastery"
            placeholder="Add Mastery Level"
          />
        </div>
        <button id="btn" @click.prevent="addNode">Add Node</button>
      </form>
    </div>
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
      mastery: null,
      category: "",
      store: useStore(),
      isProject: false
    }
  },
  methods: {
    addNode() {
      if (this.isProject == true){
        this.mastery = -1;
        this.link = "";
      }
      if (!this.id || this.mastery == null) {
        alert(
          "Please complete all input boxes!"
        );
        return;
      }
      if (!this.prereqs && !this.category) {
        alert(
          "Please input information for prerequisites, category, or both"
        );
        return;
      }
      console.log(this.mastery)
      if (!((this.mastery <= 1 && this.mastery >=0) || this.mastery==-1)) {
        alert(
          "Please input information for prerequisites, category, or both"
        );
        return;
      }

      const newNode = {
        id: this.id,
        prereqs: this.prereqs,
        link: this.link,
        mastery: this.mastery,
        category: this.category,
      };
      var prereqsArray = this.prereqs.split(", ");
      
      for (let i=0; i < prereqsArray.length; i++) {
        let p = prereqsArray[i]
        let validPrereq = false;
        for (let j = 0; j < this.store.data.nodes.length; j++) {
            let topic = this.store.data.nodes[j]
            if (p == topic.id) validPrereq = true;
        }
        if (prereqsArray[0]=='' || prereqsArray[0]==""){
          validPrereq = true;
          prereqsArray = [];
        }
        if (!validPrereq) {
            alert(
          "Please make sure the prerequisites are a comma-separated list of existing topics (with exactly one space after each comma)."
        );
        return;
        }
      }

      var catArray = this.category.split(", ");
      
      for (let i=0; i < catArray.length; i++) {
        let c = catArray[i]
        let validCat = false;
        for (let j = 0; j < this.store.data.nodes.length; j++) {
            let topic = this.store.data.nodes[j]
            if (c == topic.id) validCat = true;
        }
        if (catArray[0]=='' || catArray[0]==""){
          validCat = true;
        }
        if (!validCat) {
            alert(
          "Please make sure the categories are a comma-separated list of existing topics (with exactly one space after each comma)."
        );
        return;
        }

        
      }
      for (let i=0; i<this.store.data.nodes.length; i+=1){
            let dataNode = this.store.data.nodes[i];
            for (let j=0; j<catArray.length; j+=1){
              if (dataNode.id == catArray[j]){
                dataNode.prerequisites.push(this.id)
              }
            }
      }

      if (this.link == "") {
        this.store.data.nodes.push({
          id: newNode.id,
          mastery: newNode.mastery,
          prerequisites: prereqsArray,
          link: null,
        });
      } else {
        this.store.data.nodes.push({
          id: newNode.id,
          mastery: newNode.mastery,
          prerequisites: prereqsArray,
          link: this.link,
        });
      }

      (this.id = ""),
      (this.prereqs = ""),
        (this.link = ""),
        (this.category = ""),
        (this.mastery = "");


        this.$emit('rerenderGraph')
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 350px;
  height: 100vh;
  display: grid;
  place-items: center;
}
.form-control {
  margin: 5px;
}
.form-control input {
  margin: 5px;
  display: block;
  width: 250px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: none;
  padding: 6px;
  border-radius: 5px;
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
  background-color: #11998e;
  font-weight: 800;
  transition: all 0.5s;
  margin-top: 18px;
  border: none;
}
#btn:hover {
  background-color: #53dacf;
  color: white;
}
#checkbox{
  margin-top: 8px;
  border: none;
}
</style>
