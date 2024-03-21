import {
  addCrossLinksToDescription,
  addCrossLinkstoRelatedText,
} from "./add-crosslinks";
import { removeInnerEmptyLines } from "./remove-empty-lines";

const formatDescription = (text, links) => {
  text = text.split("\n");
  const len = text.length;
  let emptyLines = [];

  text = addCrossLinksToDescription(text, links);

  for (let i = 0; i < len; i++) {
    if (text[i] === "") {
      emptyLines.push(i);
    } else if (text[i] === "ol") {
      text[i] = "<ol>";
      for (let j = i + 1; j < len; j++) {
        if (text[j] !== "/ol") {
          text[j] = "<li>" + text[j] + "</li>";
        } else {
          text[j] = "</ol>";
          i = j;
          break;
        }
      }
    } else {
      text[i] = "<p>" + text[i].trim() + "</p>";
    }
  }

  if (emptyLines.length > 0) {
    emptyLines = emptyLines.toReversed();
    emptyLines.forEach((e) => {
      text.splice(e, 1);
    });
  }
  const last = text.length - 1;
  text[last] = text[last] + "\n";
  return text.join("\n");
};

/* Take in the minimum and maximum ages for age range, player count, and game length
 ** and format them into the text we want to appear on the front end
 */
const formatDetails = (age, players, length) => {
  const formatRange = (type, obj) => {
    let detailsText = "";
    let range = "";
    if (obj.minimum === "" || obj.minimum === "n/a") {
      return null;
    } else {
      range = obj.minimum;
      if (obj.maximum === "") {
        if (type !== "age") {
          range += "+";
        }
      } else {
        range += "-" + obj.maximum;
      }
    }
    switch (type) {
      case "age":
        detailsText = "Ages: " + range;
        break;
      case "players":
        detailsText = "Players: " + range;
        break;
      case "length":
        detailsText = "Game Length: " + range + " Minutes";
        break;
    }

    return detailsText;
  };

  const labels = [
    formatRange("age", age),
    formatRange("players", players),
    formatRange("length", length),
  ];

  const newLabels = labels.filter((e) => e !== null);
  let html = "nothing";

  if (newLabels.length > 0) {
    html = "<ul>\n";
    for (let i = 0; i < newLabels.length; i++) {
      html += "<li>" + newLabels[i] + "</li>\n";
    }
    html += "</ul>\n";
  } else {
    return null;
  }

  return html;
};

// contents, mechanisms
const formatList = (title, list) => {
  if (list === "n/a" || list === "") {
    return null;
  }

  let newList = removeInnerEmptyLines(list.split("\n"));
  const len = newList.length;
  let isEmbeddedUL = false;
  let html = "<p>" + title + "</p>\n";
  html += len < 20 ? "<ul>\n" : '<ul style="columns: 2;">\n';

  for (let i = 0; i < len; i++) {
    const firstChar = newList[i].search(/[\w|\d|\s]/g);
    const firstSpace = newList[i].search(/\s/g);

    const char = newList[i].search(/\w|\d/g);
    if (firstChar !== 0) {
      newList[i] = newList[i].slice(firstChar).trim();
    }

    if (!isEmbeddedUL && firstSpace !== 0) {
      html += "<li>" + newList[i] + "</li>\n";
    } else if (!isEmbeddedUL && firstSpace === 0) {
      isEmbeddedUL = true;
      html += "<ul>\n";
      html += "<li>" + newList[i].slice(char).trim() + "</li>\n";
    } else if (isEmbeddedUL && firstSpace === 0) {
      html += "<li>" + newList[i].slice(char).trim() + "</li>\n";
    } else {
      html += "</ul>\n";
      html += "<li>" + newList[i].slice(char).trim() + "</li>\n";
      isEmbeddedUL = false;
    }
  }
  html += "</ul>\n";

  return html;
};

const formatRelatedText = (text, links) => {
  text = addCrossLinkstoRelatedText(text, links);

  if (text === "" || !text) {
    return null;
  } else {
    return "<p>" + text + "</p>\n";
  }
};

const formatHTML = (obj) => {
  if (obj.contents) {
    obj.contents = "<hr />\n" + obj.contents;
  } else if (!obj.contents && obj.mechanisms) {
    obj.mechanisms = "<hr />\n" + obj.mechanisms;
  }

  let order = [
    obj.description,
    obj.details,
    obj.relatedText,
    obj.contents,
    obj.mechanisms,
  ];
  const len = order.length;

  let html = "";

  for (let i = 0; i < len; i++) {
    if (order[i] !== null) {
      html += order[i];
    }
  }

  return html;
};

export {
  formatDescription,
  formatDetails,
  formatList,
  formatRelatedText,
  formatHTML,
};
