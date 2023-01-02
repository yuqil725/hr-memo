export function pascalize(str: string | undefined) {
  if (!str) return "";
  let newStr = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
  return newStr;
}

export const snakeCase = (string: string) => {
  string = string.replace(/\W+/g, " ").toLowerCase().split(" ").join("_");

  if (string.charAt(string.length - 1) === "_") {
    return string.substring(0, string.length - 1);
  }

  return string;
};
