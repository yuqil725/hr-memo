import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import styles, {
  DARK_GRAY,
  DISABLE_COLOR,
  PRIMARY_COLOR,
} from "../assets/styles";
import { TTabBarIcon } from "../interfaces/general";
import { ISearchCardScreen } from "../interfaces/search";
import { useSelector } from "react-redux";
import { RootState } from "../redux_modules";

const TabBarIcon = ({ focused, iconName, text }: TTabBarIcon) => {
  let searchCardScreen: ISearchCardScreen = useSelector((state: RootState) => {
    return state.searchCardScreen;
  });

  let color = focused ? PRIMARY_COLOR : DARK_GRAY;
  if (text == "Profile" && searchCardScreen.selectedCard.documentId == "") {
    color = DISABLE_COLOR;
  }
  useEffect(() => {
    text = searchCardScreen.selectedCard.name;
  }, [searchCardScreen.selectedCard.documentId]);

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={16} color={color} />
      <Text style={[styles.tabButtonText, { color: color }]}>
        {text == "Profile" ? searchCardScreen.selectedCard.name : text}
      </Text>
    </View>
  );
};

export default TabBarIcon;
