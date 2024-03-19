<template>
  <div class="cross-link-row">
    <div class="cross-link-container">
      <input
        type="text"
        class="cross-link-title"
        placeholder="Text to link here"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="cross-link-container">
      <input
        type="text"
        class="cross-link-url"
        placeholder="https://www.vaultofmidnight.shop/"
        :value="url"
        @input="$emit('update:url', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "cross-link",
    props: {
      title: String,
      url: String,
    },
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .cross-link-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;
  }
  .cross-link-container {
    flex-grow: 1;
  }
  .cross-link-container input {
    width: 80%;
  }
  .cross-link-title,
  .cross-link-url {
    margin-left: 3px;
    height: 25px;
  }
</style>
