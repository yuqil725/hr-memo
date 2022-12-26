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
export const TSProfileItem = [
  "Name",
  "FriendshipStage",
  "LivingAddress",
  "Education",
  "Activity",
  "Comment",
  "Todo",
];

export type TProfileItem = {
  Name: string;
  FriendshipStage?: string;
  LivingAddress?: string;
  Education?: string[];
  Activity?: string[];
  Comment?: string[];
  Todo?: string[];
};

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
