<template>
    <h2>Your Personalized Learning Plan</h2>
  <div id="course-grid">
    <CourseCard
      v-for="course in cStack"
      :key="course[0]"
      :courseArray="course"
    />
  </div>
</template>

<script>
import { useStore } from "@/pinia/store";
import CourseCard from "./CourseCard.vue";

export default {
  props: ["topicName"],
  components: { CourseCard },
  data() {
    return {
      store: useStore(),
      cStack: [],
    };
  },
  mounted() {
    this.dfs(this.topicName);
    console.log(this.cStack);
  },
  methods: {
    getNode(topicName) {
      for (let i = 0; i < this.store.data.nodes.length; i++) {
        const node = this.store.data.nodes[i];
        if (node.id == topicName) {
          return node;
        }
      }
      alert("invalid topic name in getNode!");
    },
    inCStack(topicName) {
      for (let i = 0; i < this.cStack.length; i++) {
        if (this.cStack[i][0] == topicName) return true;
      }
      return false;
    },
    dfs(topicName) {
      if (this.inCStack(topicName)) return;
      let node = this.getNode(topicName);
      if (node.link) {
        this.cStack.push([node.id, node.mastery, node.link]);
      }
      for (let i = 0; i < node.prerequisites.length; i++) {
        let prereq = this.getNode(node.prerequisites[i]);
        if (!this.inCStack(prereq)) {
          console.log("calling dfs on ", prereq.id);
          this.dfs(prereq.id);
        }
      }
    },
  },
};
</script>

<style scoped>
#course-grid {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  padding: 1rem 4rem;
}
</style>
