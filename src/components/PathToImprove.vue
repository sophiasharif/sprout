<template>
  <div>
    <div class="generate-plan">
      <div class="form__group field">
        <input
          type="input"
          v-model="topicName"
          class="form__field"
          placeholder="What project or topic would you like to improve on?"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label"
          >What project or topic would you like to improve on?</label
        >
      </div>
      <button @click="createPlan" class="button-63" href="study-plan">Generate Study Plan</button>
    </div>
    <div class="feedback" v-if="displayPlan">
      <hr style="margin: 0 3rem; margin-top: 3rem;">
      <div id="study-plan">
        <div id="title">
          {{ title }}
          <span v-if="topicMastery != '-100%'">({{ topicMastery }})</span>
        </div>
        <div class="col proficient-col" v-if="analysis.proficient.length">
          <h3>Your Strong Points</h3>
          <div class="subtitle">
            <p>
              Congrats, you've mastered these concepts! Your time is best spent
              studying other topics.
            </p>
          </div>
          <TopicBreakdown
            v-for="topic in analysis.proficient"
            :key="topic.id + Math.random()"
            :topic="topic"
          />
        </div>
        <div class="col getting-there-col" v-if="analysis.gettingThere.length">
          <h3>Brush Up On These Topics</h3>
          <div class="subtitle">
            <p>
              You're on your way to mastering these topics - focus on studying the
              specific concepts you don't understand.
            </p>
          </div>
          <TopicBreakdown
            v-for="topic in analysis.gettingThere"
            :key="topic.id + Math.random()"
            :topic="topic"
          />
        </div>
        <div class="col beginning-col" v-if="analysis.beginning.length">
          <h3>Learn These Concepts</h3>
          <div class="subtitle">
            <p>
              These are important concepts for mastering this topic, but you
              haven't studied them much yet. Devote some time to learning these
              from the ground up.
            </p>
          </div>
          <TopicBreakdown
            v-for="topic in analysis.beginning"
            :key="topic.id + Math.random()"
            :topic="topic"
          />
        </div>
      </div>
      <hr style="margin: 0 3rem;">
      <div class="course-plan">
        <PersonalizedCourse :topicName="topicName" ref="courses"/>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/pinia/store";
import TopicBreakdown from "./TopicBreakdown.vue";
import PersonalizedCourse from "./PersonalizedCourse.vue";

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
  components: { TopicBreakdown, PersonalizedCourse },
  data() {
    return {
      topicName: "",
      title: "",
      displayPlan: false,
      store: useStore(),
      analysis: null,
      topicMastery: 0,
      topicColor: "",
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
      this.$refs.courses.cStack = [];
      this.$refs.courses.dfs(this.topicName)
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
      this.topicMastery = topic.mastery * 100 + "%";
      this.topicColor = this.getColor(topic.mastery);

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
    },
    getColor(mastery) {
      if (mastery == -1) return "rgb(0, 0, 139)"
      return colors[Math.floor(colors.length * mastery)];
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 0;
}
.subtitle p {
  margin-top: 0.5rem;
}
#study-plan {
  display: grid;
  grid-template-columns: repeat(auto, 1fr);
  justify-content: center;
  padding: 1rem 3rem 1rem 3rem;
}
.col {
  padding: 0.7rem;
  max-width: 550px;
}
#study-plan #title {
  grid-column: span 3;
  font-size: 30px;
  font-weight: 800;
  text-decoration: underline;
  text-decoration-color: v-bind(topicColor);
  text-decoration-thickness: 3px;
}
input {
    text-align: center;
}
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
  margin-left: 25%;
  margin-bottom: .5rem;
}

.form__field {
  font-family: inherit;
  width: 60%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1rem;
  padding-top: 10px;
  background: transparent;
}

.form__field::placeholder {
  color: transparent;
}

.form__field::placeholder-shown ~ .form__label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}
.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
  margin-left: 25%;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  font-size: 1rem;
  color: #11998e;
  font-weight: 700;
}
/* CSS */
.button-63 {
  align-items: center;
  background-image: linear-gradient(144deg, #11998e,#38ef7d);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  line-height: .5em;
  max-width: 100%;
  padding: 19px 24px;
  margin: 0 auto;
  margin-top: 2rem;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

</style>
