<template>
  <div class="cross-link-row">
    <div class="cross-link-container">
      <input
        type="text"
        class="cross-link-title"
        placeholder="Text to link here"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        @keyup="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="cross-link-container">
      <input
        type="text"
        class="cross-link-url"
        :class="{ invalid: !validURL }"
        placeholder="https://www.vaultofmidnight.shop/"
        :value="url"
        @input="$emit('update:url', $event.target.value)"
        @keyup="$emit('update:url', $event.target.value)"
      />
      <div>
        <p v-if="!validURL" class="invalid">
          URL must start with<br />
          https://vaultofmidnight.shop/
        </p>
      </div>
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
    computed: {
      validURL() {
        const urlStart = "https://vaultofmidnight.shop/";
        const urlWWWStart = "https://www.vaultofmidnight.shop/";
        if (
          this.url.includes(urlStart) ||
          this.url.includes(urlWWWStart) ||
          this.url === ""
        ) {
          return true;
        } else {
          return false;
        }
      },
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
  input.invalid {
    color: red;
    border: 2px solid red;
  }
  p.invalid {
    display: block;
    color: red;
    margin: 1px 0;
    padding: 0;
    font-size: 12px;
  }
</style>
