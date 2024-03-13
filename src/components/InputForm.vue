<template>
  <div id="container">
    <div class="input-form-container half-container">
      <DetailTextarea
        id="userInputBox"
        label="Description"
        :value="description"
        rows="20"
        cols="50"
        @update="updateTextarea('description', $event)"
      />
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
          id="mechanismsInput"
          label="Mechanisms"
          rows="10"
          cols="30"
          :value="mechanisms"
          @update="updateTextarea('mechanisms', $event)"
        />
        <DetailTextarea
          id="contentsInput"
          label="Contents"
          rows="10"
          cols="30"
          :value="contents"
          @update="updateTextarea('contents', $event)"
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
</template>

<script>
  import DetailInput from "./DetailInput";
  import DetailTextarea from "./DetailTextarea";
  import CrossLink from "./CrossLink";
  import updateValue from "../utils/update-value";
  import processDescription from "../utils/process-description";

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

  const desc =
    "Immerse yourself in the enchanting depths of a coral reef ecosystem. Cleverly expand your coral formations and create flourishing habitats, attracting an array of fascinating marine animals.\nAQUA invites you into the beauty and wonder of the ocean, delivering an incredible variety of gameplay experiences for the whole family.\n  1. Grow corals\n  2. Create habitats\n  3. Establish biodiversity\n\nContents:\n70 Coral Tiles\n72 Small Animal Tiles\n15 Large Animal Tiles\n24 Ecosystem Tiles\n1 Sea Snail Token\n4 Hot Spot Tiles\n2 Miniatures\n‣ 2 Mind Flayers\n2 Round Bases (25mm)\n1 Score Pad\nRules\n\nThis is not a stand-alone game. A copy of Meadow is required to play.\n\nDue to distribution restrictions we are only able to ship this product to the United States, Puerto Rico and U.S. Virgin Islands.\n\nAges: 14+\nPlayers: 8 to 10\nGame Length: 30-60 Minutes\n\nMechanisms:\n• End Game Bonuses\n• Pattern Building\n• Tile Placement\n• Variable Set-up";

  processDescription(desc);

  export default {
    name: "input-form",
    components: {
      DetailInput,
      DetailTextarea,
      CrossLink,
    },
    data() {
      return {
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
        mechanisms: "",
        contents: "",
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
        description: "",
      };
    },
    computed: {
      newLinks() {
        return testLinks;
      },
    },
    methods: {
      updateValue: updateValue,
      processDescription: processDescription,
      updateTextarea(key, value) {
        switch (key) {
          case "description":
            this.description = value;
            break;
          case "mechanisms":
            this.mechanisms = value;
            break;
          case "contents":
            this.contents = value;
            break;
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
