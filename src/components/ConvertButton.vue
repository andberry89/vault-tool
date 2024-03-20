<template>
  <button
    :type="type"
    @click="onClick"
    :disabled="isDisabled"
    :class="{ disabled: isDisabled }"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "convert-button",
    props: {
      type: {
        type: String,
        default: "button",
      },
      disabled: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      isDisabled() {
        return this.disabled;
      },
    },
    methods: {
      onClick() {
        if (!this.disabled) {
          this.$emit("click", true);
        }
      },
    },
  };
</script>

<style scoped>
  button {
    font: 400 16px/1.2 "Futura", "Helvetica", sans-serif;
    color: #fff;
    background-color: #666;
    border-radius: 4px;
    padding: 4px 10px;
    margin: 10px 10px;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    transition: 0.1s all;
  }
  button:active {
    background-color: #999;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
  .active {
    background-color: #ccc;
    transition: 0.1s all;
  }
</style>
