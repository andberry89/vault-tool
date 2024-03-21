import { sliceList, spliceList, spliceLine } from "./slice-splice";
import filterText from "./filter-text";
import {
  removeEmptyLinesFromEnd,
  removeInnerEmptyLines,
} from "./remove-empty-lines";
import findOrderedList from "./find-ordered-list";

const sortText = (textArr) => {
  let text = textArr;
  let contentEnd = textArr.length - 1;

  // array of regular expressions to find each necessary detail
  const regEx = [
    {
      type: "list",
      detail: "contents",
      regEx: [/(C|c)ontents:?\n*/],
    },
    {
      type: "list",
      detail: "mechanisms",
      regEx: [/(M|m)echanisms:?\n*/],
    },
    {
      type: "line",
      detail: "ages",
      regEx: [/(A|a)ges:?\s*\d+(\+?|\s*-*\s*\d+|\s*and\sup)?/],
    },
    {
      type: "line",
      detail: "players",
      regEx: [
        /(P|p)layers:?\s*\d+\s*(-|to)*\s*\d+(\s\(.*\))?/,
        /\d+\s*(-|to)*\s*\d+\s(P|p)layers/,
      ],
    },
    {
      type: "line",
      detail: "length",
      regEx: [
        /(G|g)ame\s(L|l)ength:?\s*\d+(\s*(-|to)*\d+)?\s*(M|m)inutes/,
        /\d+\s*(((H|h)our)|((to|-)*\s*\d+\s(M|m)inute))\s(P|p)lay(ing)?\s(T|t)ime/,
      ],
    },
  ];

  // List of sentences to exclude from final html
  text = filterText(text);

  let details = [];

  // UTILITY FUNCTIONS
  const findList = (textArr, idxStart, detailIdx) => {
    let idxEnd = -1;

    // Starting with the given index, find the index where a blank line occurs
    // We add two to the start index to account for blank lines after "Contents:"
    // or "Mechanisms:"
    for (let i = idxStart + 2; i < textArr.length; i++) {
      if (textArr[i] === "") {
        idxEnd = i;
        break;
      }
    }
    details[detailIdx] = sliceList(textArr, idxStart + 1, idxEnd);
    return spliceList(textArr, idxStart, idxEnd);
  };

  const findLine = (textArr, idxStart, detailIdx) => {
    details[detailIdx] = textArr[idxStart].match(/\d+/g);
    return spliceLine(textArr, idxStart);
  };

  /*
   **
   **
   **
   **
   **
   */

  // test for contents, mechanisms, and player info details
  let idxStart = 0;
  for (let i = 0; i < regEx.length; i++) {
    let hasMatch = false;
    for (let j = 0; j < regEx[i].regEx.length; j++) {
      if (!hasMatch && regEx[i].regEx[j].test(text)) {
        idxStart = text.indexOf(regEx[i].regEx[j].exec(text)[0]);
        if (idxStart < contentEnd) {
          contentEnd = idxStart;
        }
        if (regEx[i].type === "list") {
          text = findList(text, idxStart, i);
          hasMatch = true;
        } else if (regEx[i].type === "line") {
          text = findLine(text, idxStart, i);
          hasMatch = true;
        }
      }
      if (!details[i]) {
        details[i] = ["n/a"];
      }
    }
  }

  // get rid of empty lines at the end of the array
  text = removeEmptyLinesFromEnd(text);

  // see if any text exists that tell customer about other related items
  // that are required or optional but compatible

  let relatedText = "";
  if (contentEnd < text.length - 1) {
    relatedText = text
      .slice(contentEnd)
      .filter((e) => e !== "")
      .join("\n");
    text.splice(contentEnd);
    text = removeEmptyLinesFromEnd(text);
  }

  text = removeInnerEmptyLines(text);
  text = findOrderedList(text);

  return { text, details, relatedText };
};

export default sortText;
