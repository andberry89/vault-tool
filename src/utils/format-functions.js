import {
  formatOrderedList,
  formatUnorderedList,
  // formatUnorderedList
} from "./format-list";

const formatDescription = (text) => {
  const len = text.length;

  for (let i = 0; i < len; i++) {
    if (typeof text[i] !== "string") {
      text[i] = formatOrderedList(text[i]);
    } else {
      text[i] = "<p>" + text[i] + "</p>";
    }
  }
  return text;
};

const formatDetails = (text) => {
  /* format contents
   ** format mechanisms
   ** find ages
   ** find players
   ** find game length */

  const len = text.length;
  let isNotEmpty = [false, false, false, false, false];

  for (let i = 0; i < len; i++) {
    if (text[i][0].includes("n/a")) {
      continue;
    } else {
      isNotEmpty[i] = true;
    }
  }

  for (let i = 0; i < len; i++) {
    if (isNotEmpty[i]) {
      if (i === 0 || i === 1) {
        text[i] = formatUnorderedList(text[i]);
      } else {
        text[i] = text[i][0].match(/\d+/g);
      }
    } else {
      continue;
    }
  }

  return text;
};

const formatRelatedText = (text) => {
  return "<p>" + text + "</p>";
};

export { formatDescription, formatDetails, formatRelatedText };
