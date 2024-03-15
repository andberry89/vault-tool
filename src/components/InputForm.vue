<template>
  <div id="container">
    <div class="input-form-container half-container">
      <DetailTextarea
        id="userInputBox"
        label="Description"
        :value="this.details.initialDescription"
        rows="20"
        cols="50"
        @change="
          updateValue(details, 'initialDescription', $event.target.value)
        "
        @paste="updateValue(details, 'initialDescription', $event.target.value)"
        @keyup="updateValue(details, 'initialDescription', $event.target.value)"
      />
      <ConvertButton
        @click="sortDescription(this.details.initialDescription)"
        :disabled="descriptionIsEmpty"
      >
        Get Details
      </ConvertButton>
    </div>
    <div class="details-container half-container">
      <div id="top-row" class="input-row">
        <div class="detail-container">
          <div>
            <span>Player Count</span>
          </div>
          <div>
            <DetailInput
              minMax="minimum"
              label="player"
              :value="this.players.minimum"
              @update="updateValue(players, 'minimum', $event)"
            />
            <DetailInput
              minMax="maximum"
              label="player"
              :value="this.players.maximum"
              @update="updateValue(players, 'maximum', $event)"
            />
          </div>
        </div>
        <div class="detail-container">
          <div>
            <span>Game Length</span>
          </div>
          <div>
            <DetailInput
              minMax="minimum"
              label="length"
              :value="this.length.minimum"
              @update="updateValue(length, 'minimum', $event)"
            />
            <DetailInput
              minMax="maximum"
              label="length"
              :value="this.length.maximum"
              @update="updateValue(length, 'maximum', $event)"
            />
          </div>
        </div>
        <div class="detail-container">
          <div>
            <span>Age Range</span>
          </div>
          <div>
            <DetailInput
              minMax="minimum"
              label="age"
              :value="this.age.minimum"
              @update="updateValue(age, 'minimum', $event)"
            />
            <DetailInput
              minMax="maximum"
              label="age"
              :value="this.age.maximum"
              @update="updateValue(age, 'maximum', $event)"
            />
          </div>
        </div>
      </div>

      <div id="middle-row" class="input-row">
        <DetailTextarea
          id="descriptionInput"
          label="Description"
          rows="10"
          cols="30"
          :value="this.details.description"
          @update="updateValue(details, 'description', $event)"
        />
        <DetailTextarea
          id="mechanismsInput"
          label="Mechanisms"
          rows="10"
          cols="30"
          :value="this.details.mechanisms"
          @update="updateValue(details, 'mechanisms', $event)"
        />
        <DetailTextarea
          id="contentsInput"
          label="Contents"
          rows="10"
          cols="30"
          :value="this.details.contents"
          @update="updateValue(details, 'contents', $event)"
        />
      </div>

      <div id="bottom-row">
        <div>
          <span>Cross-Links</span>
        </div>
        <CrossLink :links="newLinks" />
      </div>
    </div>
  </div>

  <ConvertButton @click="generateHTML" :disabled="detailsAreEmpty">
    Generate HTML</ConvertButton
  >
</template>

<script>
  import DetailInput from "./DetailInput";
  import DetailTextarea from "./DetailTextarea";
  import CrossLink from "./CrossLink";
  import updateValue from "../utils/update-value";
  import sortText from "../utils/sort-text";
  import ConvertButton from "./ConvertButton.vue";
  import {
    formatDescription,
    formatDetails,
    formatList,
    formatRelatedText,
    formatHTML,
  } from "../utils/format-functions";

  const testLinks = [
    {
      title: "Test 1",
      url: "https://www.caranddriver.com",
      key: 0,
    },
    {
      title: "Test 2",
      url: "https://www.vaultofmidnight.com",
      key: 1,
    },
    {
      title: "Test 3",
      url: "https://google.com",
      key: 2,
    },
  ];

  export default {
    name: "input-form",
    components: {
      DetailInput,
      DetailTextarea,
      CrossLink,
      ConvertButton,
    },
    data() {
      return {
        descriptionIsEmpty: true,
        detailsAreEmpty: true,
        age: {
          minimum: "",
          maximum: "",
        },
        length: {
          minimum: "",
          maximum: "",
        },
        players: {
          minimum: "",
          maximum: "",
        },
        details: {
          mechanisms: "",
          contents: "",
          description: "",
          initialDescription: "",
          relatedText: "",
        },
        html: {
          description: "",
          contents: "",
          mechanisms: "",
          relatedText: "",
          details: "",
        },
        crossLinks: [
          {
            title: {
              type: String,
            },
            url: {
              type: String,
            },
          },
        ],
      };
    },
    computed: {
      newLinks() {
        return testLinks;
      },
      emptyDescription() {
        return this.details.initialDescription;
      },
      emptyDetails() {
        return this.details.description;
      },
    },
    methods: {
      updateValue: updateValue,
      sortDescription(text) {
        const sortedText = sortText(text.trim().split("\n"));
        this.details.description = sortedText.text.join("\n");
        this.details.relatedText = sortedText.relatedText;
        this.details.contents = sortedText.details[0].join("\n") || "";
        this.details.mechanisms = sortedText.details[1].join("\n") || "";
        this.age.minimum = sortedText.details[2][0] || "";
        this.age.maximum = sortedText.details[2][1] || "";
        this.players.minimum = sortedText.details[3][0] || "";
        this.players.maximum = sortedText.details[3][1] || "";
        this.length.minimum = sortedText.details[4][0] || "";
        this.length.maximum = sortedText.details[4][1] || "";
      },
      generateHTML() {
        this.html.description = formatDescription(this.details.description);
        this.html.relatedText = formatRelatedText(this.details.relatedText);
        this.html.details = formatDetails(this.age, this.players, this.length);
        this.html.contents = formatList("Contents:", this.details.contents);
        this.html.mechanisms = formatList(
          "Mechanisms:",
          this.details.mechanisms
        );

        const finalHTML = formatHTML(this.html);
        console.log(finalHTML);
      },
    },
    watch: {
      emptyDescription: function (newVal) {
        if (newVal !== "") {
          this.descriptionIsEmpty = false;
        } else {
          this.descriptionIsEmpty = true;
        }
      },
      emptyDetails: function (newVal) {
        if (newVal !== "") {
          this.detailsAreEmpty = false;
        } else {
          this.detailsAreEmpty = true;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  #container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 30px;
  }
  .half-container {
    border: 1px solid #000;
    border-radius: 8px;
    padding: 15px;
    flex-grow: 1;
    width: 45%;
  }
  .input-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;
  }
</style>
