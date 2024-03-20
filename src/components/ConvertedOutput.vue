<template>
  <div class="background">
    <p>HTML for RMH</p>
    <ConvertButton
      v-if="!emptyHTML"
      :disabled="false"
      @click="copyToClipboard"
      id="copy-btn"
      :class="{ active: isCopied }"
      >{{ isCopied ? "Copied!" : "Copy to Clipboard" }}</ConvertButton
    >
    <pre v-if="!emptyHTML"><code>{{ html }}</code></pre>
  </div>
</template>

<script>
  import ConvertButton from "./ConvertButton.vue";

  export default {
    name: "converted-output",
    data() {
      return {
        htmlIsEmpty: true,
        isCopied: false,
      };
    },
    props: {
      html: String,
    },
    components: {
      ConvertButton,
    },
    methods: {
      copyToClipboard() {
        navigator.clipboard.writeText(this.html);
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);
      },
    },
    computed: {
      emptyHTML() {
        const htmlIsEmpty = this.html === "" ? true : false;
        return htmlIsEmpty;
      },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    width: 80%;
    border: 1px solid #000;
    border-radius: 8px;
    margin: 0 auto;
    padding: 0 0 10px;
  }
  pre code {
    display: block;
    text-align: left;
    background-color: #ddd;
    font-size: 14px;
    white-space: pre-wrap;
    overflow-x: auto;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 8px;
  }
</style>
