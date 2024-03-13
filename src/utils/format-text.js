import { sliceList, spliceList, sliceLine, spliceLine } from "./slice-splice";
import filterText from "./filter-text";

const formatText = (textArr) => {
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
        /(P|p)layers:?\s*\d+\s*(-|to)*\s*\d+/,
        /\d+\s*(-|to)*\s*\d+\s(P|p)layers/,
      ],
    },
    {
      type: "line",
      detail: "length",
      regEx: [
        /(G|g)ame\s(L|l)ength:?\s*\d+(\s*(-|to)*\d*)\s*(M|m)inutes/,
        /\d+\s*(((H|h)our)|((to|-)*\s*\d+\s(M|m)inute))\s(P|p)lay(ing)?\s(T|t)ime/,
      ],
    },
  ];

  // List of sentences to exclude from final html
  text = filterText(text);

  let details = {
    contents: [],
    mechanisms: [],
    ages: null,
    players: null,
    length: null,
  };

  const findList = (textArr, idxStart, detailIdx) => {
    let idxEnd = -1;

    // Starting with the given index, find the index where a blank line occurs
    for (let i = idxStart; i < textArr.length; i++) {
      if (textArr[i] === "") {
        idxEnd = i;
        break;
      }
    }

    details[detailIdx] = sliceList(textArr, idxStart, idxEnd);
    return spliceList(textArr, idxStart, idxEnd);
  };

  const findLine = (textArr, idxStart, detailIdx) => {
    details[detailIdx] = sliceLine(textArr, idxStart);
    return spliceLine(textArr, idxStart);
  };

  // test for contents, mechanisms, and player info details
  for (let i = 0; i < regEx.length; i++) {
    for (let j = 0; j < regEx[i].regEx.length; j++) {
      if (regEx[i].regEx[j].test(text)) {
        const idxStart = text.indexOf(regEx[i].regEx[j].exec(text)[0]);

        if (regEx[i].type === "list") {
          text = findList(text, idxStart, i);
        } else {
          text = findLine(text, idxStart, i);
        }
      }
    }
  }

  console.log("updated text array");
  console.log(text);

  return { text, details };
};

export default formatText;
