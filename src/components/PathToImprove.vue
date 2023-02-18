<template>
  <div>
    What topic/project would you like to improve on?
    <input type="text" v-model="topicName" />
    <button @click="createPlan">Generate Study Plan</button>
    <div id="study-plan" v-if="displayPlan">
      <div id="title">{{ title }} ({{ topicMastery }})</div>
      <div class="col proficient-col">
        <h2>Your Strong Points</h2>
        <div class="subtitle">
          <p>
            Congrats, you've mastered these concepts! Your time is best spent
            studying other topics.
          </p>
        </div>
        <TopicBreakdown  v-for="topic in analysis.proficient"  :key="topic.id + Math.random()" :topic="topic" />
      </div>
      <div class="col getting-there-col">
        <h2>Brush up on these topics:</h2>
        <div class="subtitle">
          <p>
            You're on your way to mastering these topics - focus on studying the
            specific concepts you don't understand.
          </p>
        </div>
        <TopicBreakdown  v-for="topic in analysis.gettingThere"  :key="topic.id + Math.random()" :topic="topic" />
      </div>
      <div class="col beginning-col">
        <h2>Learn these concepts:</h2>
        <div class="subtitle">
          <p>
            These are important concepts for mastering this topic, but you
            haven't studied them much yet. Devote some time to learning these
            from the ground up.
          </p>
        </div>
        <TopicBreakdown  v-for="topic in analysis.beginning"  :key="topic.id + Math.random()" :topic="topic" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/pinia/store";
import TopicBreakdown from "./TopicBreakdown.vue";

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
  components: { TopicBreakdown },
  data() {
    return {
      topicName: "Electromagnetism",
      title: "",
      displayPlan: false,
      store: useStore(),
      analysis: null,
      topicMastery: 0,
      topicColor: "#FF0000",
    };
  },
  methods: {
    createPlan() {
      if (!this.isValidTopic(this.topicName)) {
        alert("Please enter a valid topic or project.");
        return;
      }
      this.title = this.topicName;
      this.displayPlan = true;
      this.getAnalysis();
    },
    isValidTopic(topicName) {
      for (let j = 0; j < this.store.data.nodes.length; j++) {
        let node = this.store.data.nodes[j];
        if (topicName == node.id) return true;
      }
      return false;
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
    getAnalysis() {
      let topic = this.getNode(this.topicName);
      this.topicMastery = topic.mastery * 100 + '%'
      this.topicColor = this.getColor(topic.mastery)

      let analysis = { proficient: [], gettingThere: [], beginning: [] };

      // CREATE INFO OBJECT FOR EACH PREREQ
      for (let i = 0; i < topic.prerequisites.length; i++) {
        const p = this.getNode(topic.prerequisites[i]);
        // create object containing info for p
        let pInfo = {
          id: p.id,
          mastery: p.mastery,
          link: p.link,
          proficientSubtopics: [],
          gettingThereSubtopics: [],
          beginningSubtopics: [],
        };
        // iterate through p's prereqs and add them to the appropriate list
        for (let j = 0; j < p.prerequisites.length; j++) {
          let subtopic = this.getNode(p.prerequisites[j]);
          if (subtopic.mastery < 0.4) {
            pInfo.beginningSubtopics.push(p);
          } else if (subtopic.mastery >= 0.8) {
            pInfo.proficientSubtopics.push(p);
          } else {
            pInfo.gettingThereSubtopics.push(p);
          }
        }
        if (p.mastery <= 0.4) {
          analysis.beginning.push(p);
        } else if (p.mastery >= 0.8) {
          analysis.proficient.push(p);
        } else {
          analysis.gettingThere.push(p);
        }
      }
      this.analysis = analysis;
      console.log(this.analysis);
    },
    getColor(mastery) {
        return colors[Math.floor(colors.length*mastery)]
    }
  },
};
</script>

<style scoped>
h2 {
    margin-bottom: 0;
}
.subtitle p {
    margin-top: .5rem;
}
#study-plan {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.col {
    padding: .7rem;
}
#study-plan #title {
  grid-column: span 3;
  font-size: 30px;
  font-weight: 800;
  text-decoration: underline;
  text-decoration-color: v-bind(topicColor);
  text-decoration-thickness: 3px;
}
</style>
