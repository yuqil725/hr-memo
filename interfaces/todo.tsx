// Used to check the type's attributes

export const ISTodoItem = {
  Name: "name",
  Todo: "todo",
  ImagePath: "imagePath",
};

export interface ITodoItems {
  name: string;
  todo: string[];
  imagePath: any;
}

export interface ITodoItem {
  name: string;
  todo: string;
  imagePath?: any;
}

export interface ITodoList {
  date: string;
  item?: ITodoItem[];
}
