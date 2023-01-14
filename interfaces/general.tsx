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

export interface IProfileOneLine {
  image: any;
  lastMessage: string;
  name: string;
  disabled?: boolean;
  onPress?: any;
}

export type TTabBarIcon = {
  focused: boolean;
  iconName: any;
  text: string;
};

// checkbox
export interface ICheckbox {
  checked?: boolean;
  onChecked?: any;
  textInputProps?: any;
}
