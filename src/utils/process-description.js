import sortText from "./sort-text";

const processDescription = (text) => {
  /*
    Format Description
    */

  let textArr = text.trim().split("\n");
  console.log("initial text array");
  console.log(textArr);
  const sortedText = sortText(textArr);
  console.log(sortedText);

  // console.log("Updated Text Array");
  // console.log(sortedText.text);
  // console.log("Details Array");
  // console.log(sortedText.details);
  // console.log("Related Items Text");
  // console.log(sortedText.relatedText);
};

export default processDescription;
