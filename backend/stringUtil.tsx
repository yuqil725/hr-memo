export function pascalize(str: string | undefined) {
  if (!str) return "";
  let newStr = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
  return newStr;
}
