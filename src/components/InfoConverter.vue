<template>
  <main id="holder">
    <InputForm class="input" @update="updateHTML($event)" />
    <ConvertedOutput class="output" :html="html" />
  </main>
</template>

<script>
  import InputForm from "./InputForm";
  import ConvertedOutput from "./ConvertedOutput";

  export default {
    name: "info-converter",
    data() {
      return {
        html: "",
      };
    },
    components: {
      InputForm,
      ConvertedOutput,
    },
    methods: {
      updateHTML(html) {
        this.html = html;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .output {
    margin-top: 10px;
  }
</style>
