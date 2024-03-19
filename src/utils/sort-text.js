import { sliceList, spliceList, spliceLine } from "./slice-splice";
import filterText from "./filter-text";
import removeEmptyLines from "./remove-empty-lines";
import findOrderedList from "./find-ordered-list";

const sortText = (textArr) => {
  let text = textArr;

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
    for (let i = idxStart; i < textArr.length; i++) {
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
  for (let i = 0; i < regEx.length; i++) {
    let hasMatch = false;
    for (let j = 0; j < regEx[i].regEx.length; j++) {
      if (!hasMatch && regEx[i].regEx[j].test(text)) {
        const idxStart = text.indexOf(regEx[i].regEx[j].exec(text)[0]);

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
  text = removeEmptyLines(text);

  // see if any text exists that tell customer about other related items
  // that are required or optional but compatible
  let relatedText = "";
  if (text.length > 2 && text[-1] !== "") {
    relatedText = text.pop();
    text = removeEmptyLines(text);
  }

  text = findOrderedList(text);

  return { text, details, relatedText };
};

export default sortText;
