import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      data: {
        nodes: [
          {
            id: "Calculus",
            mastery: 0.7,
            prerequisites: [],
            link: "https://www.youtube.com/embed/4i1MUWJoI0U",
          },
          {
            id: "Classical Mechanics",
            mastery: 0.5,
            prerequisites: ["Calculus"],
            link: "https://www.youtube.com/embed/wWnfJ0-xXRE."
          },
          {
            id: "Electromagnetism",
            mastery: 0.6,
            prerequisites: ["Calculus", "Classical Mechanics"],
            link: "https://www.youtube.com/embed/rtlJoXxlSFE"
          },
          { id: "Quantum Mechanics", mastery: 0, prerequisites: ["Calculus"], link: "https://www.youtube.com/embed/hyctIDPRSqY" },
          { id: "Thermodynamics", mastery: 0, prerequisites: ["Calculus"], link: "https://www.youtube.com/embed/4i1MUWJoI0U" },
        ],
        links: [],
      },
    };
  },
});
