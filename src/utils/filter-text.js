const filterText = (textArr) => {
  const filter = [
    "Due to distribution restrictions we are only able to ship this product to the United States, Puerto Rico and U.S. Virgin Islands.",
  ];

  for (let i = 0; i < filter.length; i++) {
    const idx = textArr.indexOf(filter[i]);

    if (idx > 0) {
      textArr = textArr.toSpliced(idx, 1);
    }
  }

  return textArr;
};

export default filterText;
