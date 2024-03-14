import sortText from "./sort-text";
import {
  formatDescription,
  formatDetails,
  formatRelatedText,
} from "./format-functions";

const processDescription = (text) => {
  let textArr = text.trim().split("\n");
  const sortedText = sortText(textArr);
  const formattedDescription = formatDescription(sortedText.text);
  const formattedDetails = formatDetails(sortedText.details);
  const formattedRelatedText = formatRelatedText(sortedText.relatedText);

  return { formattedDescription, formattedDetails, formattedRelatedText };
};

export default processDescription;
