import simplePinyin from "simple-pinyin";

export const ToPinYinName = (chinese) => {
  const nameArray = simplePinyin(chinese, { pinyinOnly: false });
  return nameArray.join("");
};
