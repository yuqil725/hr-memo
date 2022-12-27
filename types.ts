export type TCardItem = {
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  isOnline?: boolean;
  matches?: string;
  name: string;
};

export type TIcon = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

// Used to check the type's attributes
export const ISProfileDisplayItem = {
  Name: "name",
  FriendshipStage: "friendshipStage",
  LivingAddress: "livingAddress",
  Education: "education",
  Activity: "activity",
  Comment: "comment",
  Todo: "todo",
  Image: "image",
};

export interface IProfileDisplayItem {
  name: string;
  friendshipStage?: string;
  livingAddress?: string;
  education?: string[];
  activity?: string[];
  comment?: string[];
  todo?: string[];
  image?: any;
}

// Used to check the type's attributes
export const ISProfileMetaItem = {
  $id: "documentId",
};

export interface IProfileMetaItem {
  documentId: string;
}

export interface IProfileItem {
  display: IProfileDisplayItem;
  meta: IProfileMetaItem;
}

export type TTabBarIcon = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type TData = {
  id: number;
  name: string;
  isOnline: boolean;
  match: string;
  description: string;
  message: string;
  image: any;
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
};

export interface IScreenActivity {
  viewOffsetEnable: boolean;
}
