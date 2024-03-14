const findOrderedList = (text) => {
  const len = text.length;
  const olRegEx = /^\s{0,3}\d+\.\s{0,2}/;
  const olIdx = text.findIndex((e) => olRegEx.test(e));
  let ol = [];

  if (olIdx) {
    ol = ["ol"];
    let endIdx = len - 1;
    let item = 1;

    for (let i = olIdx; i < len; i++) {
      let str = item.toString() + ".";

      if (text[i].includes(str)) {
        ol.push(text[i].trim().slice(2).trim());
        item++;
      } else {
        endIdx = i;
        break;
      }
    }

    text[olIdx] = ol;
    text = text.toSpliced(olIdx + 1, endIdx - olIdx);
  }

  return text;
};

export default findOrderedList;
