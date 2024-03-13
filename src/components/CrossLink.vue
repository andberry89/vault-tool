<template>
  <ul>
    <li v-for="link in links" :key="link.key">
      <div class="cross-link-row">
        <div class="cross-link-container">
          <label :for="'title-' + link.key">Title:</label>
          <input
            type="text"
            class="cross-link-title"
            :name="'title-' + link.key"
            :id="'title-' + link.key"
            :value="link.title"
          />
        </div>
        <div class="cross-link-container">
          <label :for="'url-' + link.key">URL:</label>
          <input
            type="text"
            class="cross-link-url"
            :name="'url-' + link.key"
            :id="'url-' + link.key"
            :value="link.url"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "cross-link",
    props: {
      links: {
        Object: {
          title: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      },
      //   title: {
      //     type: String,
      //   },
      //   label: {
      //     type: String,
      //     default: "",
      //   },
      //   type: {
      //     type: String,
      //   },
    },
    // computed: {
    //   minLabel() {
    //     return "min-" + this.label;
    //   },
    //   maxLabel() {
    //     return "max-" + this.label;
    //   },
    // },
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
