const addCrossLinksToDescription = (text, links) => {
  let linksArr = [
    [links.first.title, links.first.url],
    [links.second.title, links.second.url],
    [links.third.title, links.third.url],
  ];

  let hasLinks = false;
  const len = text.length;

  linksArr.forEach((e) => {
    if (e.some((e) => e !== "")) {
      hasLinks = true;
    }
  });

  if (hasLinks) {
    for (let j = 0; j < linksArr.length; j++) {
      const title = linksArr[j][0];
      if (title !== null && title !== "") {
        for (let i = 0; i < len; i++) {
          if (text[i].includes(title)) {
            const newTitle =
              '<a href="' +
              linksArr[j][1] +
              '" target="_blank">' +
              title +
              "</a>";
            text[i] = text[i].replace(title, newTitle);
          }
        }
      }
    }
  }

  return text;
};

const addCrossLinkstoRelatedText = (text, links) => {
  let linksArr = [
    [links.first.title, links.first.url],
    [links.second.title, links.second.url],
    [links.third.title, links.third.url],
  ];

  let hasLinks = false;

  linksArr.forEach((e) => {
    if (e.some((e) => e !== "")) {
      hasLinks = true;
    }
  });

  if (hasLinks) {
    for (let j = 0; j < linksArr.length; j++) {
      const title = linksArr[j][0];
      if (title !== null && title !== "") {
        if (text.includes(title)) {
          const newTitle =
            '<a href="' +
            linksArr[j][1] +
            '" target="_blank">' +
            title +
            "</a>";
          text = text.replace(title, newTitle);
        }
      }
    }
  }
  return text;
};

export { addCrossLinksToDescription, addCrossLinkstoRelatedText };
