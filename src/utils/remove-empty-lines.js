const removeEmptyLines = (text) => {
  while ((text.slice(-1)[0] === "") | "\n") {
    text.pop();
  }
  return text;
};

export default removeEmptyLines;
