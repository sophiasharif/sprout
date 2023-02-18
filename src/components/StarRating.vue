<template>
    <span
      v-for="star in stars"
      :key="star"
      class="star"
      :class="{ filled: star <= numStars }"
      >&#9733;</span
    >
</template>

<script>
export default {
  props: {
    numStars: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5,
    },
  },
  computed: {
    stars() {
      return [1, 2, 3, 4, 5];
    },
  },
};
</script>

<style scoped>
.star {
  font-size: 24px;
  color: #ddd;
  cursor: pointer;
  margin-right: 4px;
}
.filled {
  color: gold;
}
</style>
