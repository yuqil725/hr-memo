// Used to check the type's attributes

export const ISTodoItem = {
  $id: "documentId",
  Name: "name",
  Todo: "todo",
  ImagePath: "imagePath",
};

export interface ITodoItems {
  documentId: string;
  name: string;
  todo: string[];
  imagePath: any;
}

export interface ITodoItem {
  documentId: string;
  name: string;
  todo: string;
  imagePath?: any;
  disabled?: boolean;
}

export interface ITodoList {
  date: string;
  item?: ITodoItem[];
}
