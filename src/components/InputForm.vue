<template>
  <div class="half-unit">
    <div id="container">
      <div class="input-form-container half-container background">
        <DetailTextarea
          id="userInputBox"
          label="Description"
          :value="this.details.initialDescription"
          rows="20"
          cols="50"
          @change="
            updateValue(details, 'initialDescription', $event.target.value)
          "
          @paste="
            updateValue(details, 'initialDescription', $event.target.value)
          "
          @keyup="
            updateValue(details, 'initialDescription', $event.target.value)
          "
        />
        <ConvertButton
          @click="sortDescription(this.details.initialDescription)"
          :disabled="descriptionIsEmpty"
        >
          Get Details
        </ConvertButton>
        <ConvertButton
          @click="clearDescription()"
          :disabled="descriptionIsEmpty"
        >
          Clear Details</ConvertButton
        >
      </div>
      <div class="details-container half-container background">
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
            <span>Related Text</span>
          </div>

          <RelatedText
            :value="this.details.relatedText"
            @update="updateValue(details, 'relatedText', $event)"
          />

          <div>
            <span>Cross-Links</span>
          </div>

          <CrossLink
            v-model:title="crossLinks.first.title"
            v-model:url="crossLinks.first.url"
          />
          <CrossLink
            v-model:title="crossLinks.second.title"
            v-model:url="crossLinks.second.url"
          />
          <CrossLink
            v-model:title="crossLinks.third.title"
            v-model:url="crossLinks.third.url"
          />
        </div>
        <ConvertButton
          class="html-btn"
          @click="generateHTML"
          :disabled="detailsAreEmpty"
        >
          Generate HTML</ConvertButton
        >
        <ConvertButton
          class="html-btn"
          @click="clearDetails()"
          :disabled="detailsAreEmpty"
          >Clear Details</ConvertButton
        >
      </div>
    </div>
  </div>
</template>

<script>
  import DetailInput from "./DetailInput";
  import DetailTextarea from "./DetailTextarea";
  import CrossLink from "./CrossLink";
  import updateValue from "../utils/update-value";
  import sortText from "../utils/sort-text";
  import ConvertButton from "./ConvertButton.vue";
  import RelatedText from "./RelatedText";
  import {
    formatDescription,
    formatDetails,
    formatList,
    formatRelatedText,
    formatHTML,
  } from "../utils/format-functions";

  export default {
    name: "input-form",
    components: {
      DetailInput,
      DetailTextarea,
      CrossLink,
      ConvertButton,
      RelatedText,
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
        crossLinks: {
          first: {
            title: "",
            url: "",
          },
          second: {
            title: "",
            url: "",
          },
          third: {
            title: "",
            url: "",
          },
        },
      };
    },
    computed: {
      emptyDescription() {
        return this.details.initialDescription;
      },
      emptyDetails() {
        return this.details.description;
      },
    },
    methods: {
      updateValue: updateValue,
      clearDescription() {
        this.details.initialDescription = "";
      },
      clearDetails() {
        this.details.description = "";
        this.details.relatedText = "";
        this.details.contents = "";
        this.details.mechanisms = "";
        this.age.minimum = "";
        this.age.maximum = "";
        this.players.minimum = "";
        this.players.maximum = "";
        this.length.minimum = "";
        this.length.maximum = "";
      },
      sortDescription(text) {
        this.clearDetails();
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
        this.html.description = formatDescription(
          this.details.description,
          this.crossLinks
        );
        this.html.relatedText = formatRelatedText(
          this.details.relatedText,
          this.crossLinks
        );
        this.html.details = formatDetails(this.age, this.players, this.length);
        this.html.contents = formatList("Contents:", this.details.contents);
        this.html.mechanisms = formatList(
          "Mechanisms:",
          this.details.mechanisms
        );

        const finalHTML = formatHTML(this.html);
        this.$emit("update", finalHTML);
      },
      updateLink(link, idx, value) {
        this.crossLinks[link][idx] = value;
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
  .html-btn {
    margin-top: 30px;
  }
</style>
