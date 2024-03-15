<template>
  <div class="detail-textarea-container">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :name="id"
      :rows="rows"
      :cols="cols"
      :value="value"
      @change="emitValue($event)"
    >
    </textarea>
  </div>
</template>

<script>
  export default {
    name: "detail-textarea",
    props: {
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      value: {
        default: "",
        required: false,
      },
      rows: {
        type: String,
        default: "10",
      },
      cols: {
        type: String,
        default: "10",
      },
    },
    methods: {
      emitValue(event) {
        this.$emit("update", event.target.value);
      },
    },
  };
</script>

<style scoped>
  .detail-textarea-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  textarea {
    width: 90%;
  }
  .detail-textarea-container label {
    font: 400 16px/1 "Avenir", "Helvetica", sans-serif;
    color: #2c3e50;
  }
</style>
