<template>
  <InfoConverter />
</template>

<script>
  import "./styles/main.css";
  import InfoConverter from "./components/InfoConverter";

  export default {
    name: "App",
    components: {
      InfoConverter,
    },
  };
</script>

<style>
  #app {
    font-family: Futura, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
