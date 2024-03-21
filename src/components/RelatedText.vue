<template>
  <div class="related-text-container">
    <input
      type="text"
      :value="value"
      placeholder="Related Text will go here"
      @change="$emit('update', $event.target.value)"
    />
  </div>
</template>

<script>
  export default {
    name: "related-text",
    props: {
      value: String,
    },
  };
</script>

<style scoped>
  .related-text-container {
    width: 100%;
    padding: 5px;
  }
  input {
    width: 95%;
    height: 25px;
  }
</style>
