const sliceList = (textArr, startIdx, endIdx) => {
  if (endIdx > 0) {
    return textArr.slice(startIdx, endIdx);
  } else {
    return textArr.slice(startIdx);
  }
};

const spliceList = (textArr, startIdx, endIdx) => {
  const deleteCount = endIdx - startIdx + 1;

  if (endIdx > 0) {
    return textArr.toSpliced(startIdx, deleteCount);
  } else {
    return textArr.toSpliced(startIdx);
  }
};

const sliceLine = (textArr, startIdx) => {
  return textArr.slice(startIdx, startIdx + 1);
};

const spliceLine = (textArr, startIdx) => {
  return textArr.toSpliced(startIdx, 1);
};

export { sliceList, spliceList, sliceLine, spliceLine };
