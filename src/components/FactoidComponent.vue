<template>
  <div>
    <a>{{ facoid.fact }}</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facoid: { fact: null },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("http://localhost:8000/api/factoid/");
        this.facoid.fact = response.data.fact;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
