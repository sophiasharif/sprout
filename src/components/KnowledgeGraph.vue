<template>
  <div>
    <div v-if="selectedNode" id="modal">
      <div class="modal-content">
        <span class="close" @click="selectedNode = null">&times;</span>
        <h2>{{ selectedNode.id }}</h2>
        <p>
          Prerequisites:
          {{
            selectedNode.prerequisites
              ? selectedNode.prerequisites.join(", ")
              : "none"
          }}
        </p>
        <p>Mastery: {{ selectedNode.mastery }}</p>
        <iframe width="525" height="393" :src="selectedNode.link"> </iframe>
      </div>
    </div>
    <div ref="graph"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { useStore } from "@/pinia/store";

const masteryColors = [
  "#D3D3D3",
  "#ff6863",
  "#ff964f",
  "#ffb347",
  "#fdfd95",
  "#90EE90",
  "#005C29",
  "#006400",
];
function getColorFromMastery(mastery) {
  if (mastery == 1) {
    console.log(masteryColors[masteryColors.length - 1])
    return masteryColors[masteryColors.length - 1];
  }
  const index = Math.floor(mastery * masteryColors.length);
  const color = masteryColors[index];
  return color;
}

export default {
  mounted() {
    this.renderGraph();
  },
  props: ["data"],
  data() {
    return {
      selectedNode: null,
      store: useStore(),
    };
  },
  methods: {
    renderGraph() {
      d3.select("svg").remove();
      this.loopThruPrereqs();
      const svg = d3
        .select(this.$refs.graph)
        .append("svg")
        .attr("width", 1000)
        .attr("height", 600);

      const simulation = d3
        .forceSimulation(this.store.data.nodes)
        .force(
          "link",
          d3.forceLink(this.store.data.links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-5000)) // spread apart value
        .force("center", d3.forceCenter(500, 300)); // position center of graph

      const link = svg
        .append("g")
        .selectAll("line")
        .data(this.store.data.links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(this.store.data.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", (d) => getColorFromMastery(d.mastery))
        .call(drag(simulation));

      const label = svg
        .append("g")
        .selectAll("text")
        .data(this.store.data.nodes)
        .enter()
        .append("text")
        .text((d) => d.id)
        .attr("dx", 12)
        .attr("dy", 4)
        .on("click", (event, node) => {
          this.displayNodeData(node);
        });

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        label.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });
    },
    loopThruPrereqs() {
      this.store.data.links = [];
      for (let i = 0; i < this.store.data.nodes.length; i = i + 1) {
        for (
          let j = 0;
          j < this.store.data.nodes[i].prerequisites.length;
          j = j + 1
        ) {
          this.store.data.links.push({
            source: this.store.data.nodes[i].id,
            target: this.store.data.nodes[i].prerequisites[j],
          });
        }
      }
    },
    displayNodeData(node) {
      this.selectedNode = node;
      console.log(this.selectedNode);
    },
  },
};

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
</script>

<style scoped>
svg {
  border: 1px solid black;
}
#modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  max-width: 100%;
  height: 600px;
  max-height: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.modal-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

span.close {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
  font-size: 30px;
}
</style>
