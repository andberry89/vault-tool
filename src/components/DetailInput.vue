<template>
  <div class="detail-input-container">
    <input
      type="text"
      :id="newLabel"
      :name="newLabel"
      :value="value"
      :class="{ invalid: !validInput }"
      @change="emitValue($event.target.value)"
      @keyup="emitValue($event.target.value)"
    />
    <label :for="newLabel" :class="{ invalid: !validInput }">
      {{ validInput ? minOrMax : "Numbers only (check for spaces)" }}
    </label>
  </div>
</template>

<script>
  import isNumeric from "validator/lib/isNumeric";

  export default {
    name: "detail-input",
    props: {
      minMax: {
        type: String,
        default: "",
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
      },
      allowNegativeNumbers: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      newLabel() {
        return this.minMax + "-" + this.label;
      },
      minOrMax() {
        const firstLetter = this.minMax.charAt(0).toUpperCase();
        const remainingLetters = this.minMax.slice(1);
        return firstLetter + remainingLetters;
      },
      validInput() {
        if (this.value === "") {
          return true;
        } else {
          return isNumeric(this.value);
        }
      },
    },
    methods: {
      emitValue(value) {
        this.$emit("update", value);
      },
    },
  };
</script>

<style scoped>
  .detail-input-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .detail-input-container label {
    font: 400 12px/1 "Arial", sans-serif;
    color: #666;
    margin: 4px 0;
  }
  .detail-input-container input {
    width: 60px;
    height: 25px;
  }
  .detail-input-container input.invalid {
    border: 2px solid red;
  }
  .detail-input-container label.invalid {
    color: red;
  }
</style>
