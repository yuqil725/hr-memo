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
  livingAddress?: string[];
  friendshipStage?: string[];
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

export interface IProfileScreenActivity {
  friendshipDropdownOpen: boolean;
}
