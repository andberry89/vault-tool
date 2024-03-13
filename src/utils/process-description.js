import removeEmptyLines from "./remove-empty-lines";
import formatText from "./format-text";

const processDescription = (text) => {
  /*
    Format Description
    */

  let textArr = text.trim().split("\n");
  textArr = removeEmptyLines(textArr);
  console.log("initial text array");
  console.log(textArr);
  const formattedText = formatText(textArr);

  // const desc = text.slice(0, Math.min(...details.idx));
  console.log("Details Array");
  console.log(formattedText.details);
  // console.log(desc);
};

export default processDescription;
