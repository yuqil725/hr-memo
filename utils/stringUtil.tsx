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
  name = name.trimStart();
  return /^[A-Za-z0-9 \-()]*$/.test(name) ? name.toLowerCase() : ToPinYinName(name);
};

export function removeTodoDate(todoStr: string) {
  return todoStr.startsWith("-") || todoStr.startsWith("[")
    ? todoStr.slice(todoStr.indexOf("]") + 2).trimStart()
    : todoStr.trimStart();
}

export function updateTodo(todo: string, disabled: boolean) {
  let lastDash = 0;
  while (todo && todo.slice(lastDash).startsWith("-")) {
    lastDash += 1;
    todo = todo.slice(lastDash);
  }
  if (disabled) {
    todo = "-" + todo;
  }
  return todo;
}
