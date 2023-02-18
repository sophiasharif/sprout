import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      data: {
        nodes: [
          {
            id: "Create a Blog",
            mastery: -1,
            prerequisites: ["HTML", "CSS", "Javascript", "Firebase"],
            link: "",
          },
          { id: "Firebase", mastery: 0.1, prerequisites: [], link: "https://www.youtube.com/embed/knk5Fjrpde0" },
          {
            id: "HTML",
            mastery: 0.9,
            prerequisites: ["Tags", "Inheritance Structure", "Forms & Validations"],
            link: "https://www.youtube.com/embed/XiQ9rjaa2Ow"
          },
          { id: "Tags", mastery: 1.0, prerequisites: [], link: "https://www.youtube.com/embed/tv6bxtCjqDI"},
          { id: "Inheritance Structure", mastery: 0.8, prerequisites: [], link: "https://www.youtube.com/embed/6KcIH9b5ycw" },
          { id: "Forms & Validations", mastery: 0.1, prerequisites: [], link: "https://www.youtube.com/embed/eUkDdEwUgjs" },
          {
            id: "CSS",
            mastery: 0.6,
            prerequisites: ["CSS Basics", "CSS Layouts", "Responsive Design"],
            link: "https://www.youtube.com/embed/TZTaGTQKl2I"
          },
          { id: "CSS Basics", mastery: 0.8, prerequisites: [], link: "https://www.youtube.com/embed/l1mER1bV0N0" },
          { id: "CSS Layouts", mastery: 0.5, prerequisites: ["Positioning", "Display"], link: "https://www.youtube.com/embed/vHuSz4fRM88" },
          { id: "Responsive Design", mastery: 0, prerequisites: [], link: "https://www.youtube.com/embed/srvUrASNj0s" },
          { id: "Positioning", mastery: 0.8, prerequisites: [], link: "https://www.youtube.com/embed/P6UgYq3J3Qs" },
          { id: "Display", mastery: 0.2, prerequisites: [], link: "https://www.youtube.com/embed/LxVXkJXbCYo" },
          {
            id: "Javascript",
            mastery: 0.3,
            prerequisites: ["DOM Manipulation", "Fetch API"],
            link: "https://www.youtube.com/embed/hdI2bqOjy3c"
          },
          { id: "DOM Manipulation", mastery: 0.2, prerequisites: [], link: "https://www.youtube.com/embed/y17RuWkWdn8" },
          { id: "Fetch API", mastery: 0.0, prerequisites: [], link: "https://www.youtube.com/embed/drK6mdA9d_M" },
          
          {
            id: "Prepare for Technical Interview",
            mastery: -1,
            prerequisites: ["Javascript", "Data Structures"],
            link: "",
          },
          { id: "Data Structures", mastery: 0.7, prerequisites: [], link: "https://www.youtube.com/embed/DuDz6B4cqVc" },
        ],
        links: [],
      },
    };
  },
});
