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
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
