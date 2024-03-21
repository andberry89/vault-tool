const removeEmptyLinesFromEnd = (text) => {
  while ((text.slice(-1)[0] === "") | "\n") {
    text.pop();
  }
  return text;
};

const removeInnerEmptyLines = (text) => {
  return text.filter((e) => e !== "");
};

export { removeEmptyLinesFromEnd, removeInnerEmptyLines };
