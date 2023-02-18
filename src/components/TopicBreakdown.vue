<template>
  <div class="topic-info">
    <h4>
      {{ topic.id }} <StarRating :numStars="getStarRating(topic.mastery)" />
    </h4>
    <div class="prereqs">
      <div
        class="prereq"
        v-for="prereq in topic.prerequisites"
        :key="prereq + Math.random()"
      >
        {{ prereq }} ({{ getMastery(prereq) * 100 }}%)
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/pinia/store";
import StarRating from "./StarRating.vue";

const colors = [
  "#D3D3D3",
  "#eddc99",
  "#d3e25c",
  "#a9c648",
  "#81aa35",
  "#5b8e23",
  "#347311",
  "#005800",
];

export default {
  components: { StarRating },
  props: ["topic"],
  data() {
    return {
      store: useStore(),
    };
  },
  methods: {
    getStarRating(mastery) {
      return Math.floor(mastery * 5);
    },
    getNode(topicName) {
      for (let i = 0; i < this.store.data.nodes.length; i++) {
        const node = this.store.data.nodes[i];
        if (node.id == topicName) {
          return node;
        }
      }
      alert("invalid topic name in getNode!");
    },
    getMastery(topicName) {
      return this.getNode(topicName).mastery;
    },
  },
  computed: {
    color() {
        return colors[Math.floor(colors.length*this.topic.mastery)]
    }
  }
};
</script>

<style scoped>
.topic-info {
  margin-left: 1rem;
}
h4 {
  margin-bottom: 4px;
  text-align: left;
}
.prereqs {
  font-style: italic;
  color: v-bind(color);
  text-align: left;
  margin-left: 2rem;
}
</style>
