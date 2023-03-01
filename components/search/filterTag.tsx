import React from "react";
import { Platform, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { stringToColour } from "../../assets/styles";
import { SSearch } from "../../assets/styles/search";
import { ISearchCardScreen } from "../../interfaces/search";
import store from "../../redux_modules";
import { AChangeSearchCardScreen } from "../../redux_modules/action";

export const FilterTag = (searchCardScreen: ISearchCardScreen) => {
  return (
    <View
      style={{
        ...SSearch.tagContainer,
        minHeight: Platform.OS === "web" ? "fit-content" : undefined,
      }}
    >
      {[...searchCardScreen.tagSelection!].sort().map((t, i) => {
        const tagEnable =
          searchCardScreen.tagSelected.length == 0 ||
          searchCardScreen.tagSelected.indexOf(t) !== -1;
        return (
          <RectButton
            key={i}
            style={{ opacity: tagEnable ? 1 : 0.1 }}
            onPress={() => {
              let newArray = [...searchCardScreen.tagSelected];
              const index = newArray.indexOf(t);
              index === -1 ? newArray.push(t) : newArray.splice(index, 1);
              store.dispatch(
                AChangeSearchCardScreen({ tagSelected: newArray })
              );
            }}
          >
            <View
              style={{
                ...SSearch.tagView,
                backgroundColor: stringToColour(t),
              }}
            >
              <Text style={{ ...SSearch.tagText }}>{t}</Text>
            </View>
          </RectButton>
        );
      })}
    </View>
  );
};
