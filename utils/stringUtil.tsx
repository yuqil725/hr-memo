import { ToPinYinName } from "./pinyin";

export function Pascalize(str: string | undefined) {
  if (!str) return "";
  let newStr = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
  return newStr;
}

export const SnakeCase = (string: string) => {
  string = string.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");

  if (string.charAt(string.length - 1) === "_") {
    return string.substring(0, string.length - 1);
  }

  return string;
};

export const ProcessName = (name: string) => {
  return /^[A-Za-z0-9 ]*$/.test(name) ? name.toLowerCase() : ToPinYinName(name);
};
