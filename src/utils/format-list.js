const formatOrderedList = (arr) => {
  const len = arr.length;
  const isOrderedList = arr[0] === "ol";

  if (isOrderedList) {
    arr[0] = "<ul>";
    for (let i = 1; i < len; i++) {
      arr[i] = "<li>" + arr[i] + "</li>";
    }
    arr.push("</ul>");
    arr = arr.join("\n");

    return arr;
  }
  return;
};

const formatUnorderedList = (arr) => {
  arr[0] = "<p>" + arr[0] + "</p>";
  arr.splice(1, 0, "<ul>");

  const len = arr.length;
  for (let i = 2; i < len; i++) {
    arr[i] = "<li>" + arr[i] + "</li>";
  }
  arr.push("</ul>");

  return arr.join("\n");
};

export { formatOrderedList, formatUnorderedList };
