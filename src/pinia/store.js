import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: ()=> {
    return {
        data: {
            nodes: [
              { id: "Calculus", mastery: 0.7, prerequisites: [] },
              {
                id: "Classical Mechanics",
                mastery: 0.5,
                prerequisites: ["Calculus"],
              },
              {
                id: "Electromagnetism",
                mastery: 0.6,
                prerequisites: ["Calculus", "Classical Mechanics"],
              },
              { id: "Quantum Mechanics", mastery: 0, prerequisites: ["Calculus"] },
              { id: "Thermodynamics", mastery: 0, prerequisites: ["Calculus"] },
            ],
            links: [],
          }
    }
  }
})