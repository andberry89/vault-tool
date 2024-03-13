const findOrderedUnorderedList = (text) => {
  const olRegEx = /^\s{0,3}\d+\.\s{0,2}/;
  const ulRegEx = /^\s{0,3}[^A-Za-z0-9\s]+/;

  const len = text.length;

  const olIdx = text.findIndex((e) => olRegEx.test(e));

  let ol = [];
  let ul = [];

  if (olIdx) {
    ol = ["ol"];
    let endIdx = len - 1;
    let item = 1;

    for (let i = olIdx; i < len; i++) {
      let str = item.toString() + ".";

      if (text[i].includes(str)) {
        ol.push(text[i]);
        item++;
      } else {
        endIdx = i;
        break;
      }
    }

    text[olIdx] = ol;
    text = text.toSpliced(olIdx + 1, endIdx - olIdx);
  }

  const ulIdx = text.findIndex((e) => ulRegEx.test(e));

  if (ulIdx) {
    ul = ["ul"];
    let endIdx = len - 1;

    for (let i = ulIdx; i < len; i++) {
      if (ulRegEx.test(text[i])) {
        ul.push(text[i]);
      } else if (i === len - 1) {
        endIdx = i;
        break;
      }
    }

    text[ulIdx] = ul;
    text = text.toSpliced(ulIdx + 1, endIdx - ulIdx - 1);
  }

  return text;
};

export default findOrderedUnorderedList;
