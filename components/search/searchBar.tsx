import React, { useRef } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../../assets/styles";
import { ApiProfileCollection } from "../../backend/appwrite/service/database/collection/profile";
import { ISearchCardScreen } from "../../interfaces/search";
import store from "../../redux_modules";
import { AChangeSearchCardScreen } from "../../redux_modules/action";
import { NEW_CARD } from "../../redux_modules/reducer/change_search_card_screen";

export const SearchBar = (
  searchCardScreen: ISearchCardScreen,
  apiProfileCollection: ApiProfileCollection,
  navigation: any
) => {
  const searchInputRef: React.MutableRefObject<TextInput | null> = useRef(null);
  const createNewProfile = () => {
    console.log("Creating a new namecard");
    const promise = apiProfileCollection.createDocument({
      Name: NEW_CARD.name,
    });
    promise.then(
      function (response: any) {
        store.dispatch(
          AChangeSearchCardScreen({
            renderScreen: Math.random(),
            selectedCard: {
              name: response.Name,
              documentId: response.$id,
              imagePath: response.ImagePath,
            },
          })
        );
      },
      function (error: any) {
        console.error(error);
      }
    );
    navigation.navigate("Profile");
    store.dispatch(AChangeSearchCardScreen({ searchText: "" }));
  };
  return (
    <View style={styles.top}>
      <TextInput
        ref={searchInputRef}
        placeholder={"Search name"}
        onLayout={() => {
          searchInputRef.current!.focus();
        }}
        style={styles.title}
        value={searchCardScreen.searchText}
        onChangeText={(v) => {
          store.dispatch(AChangeSearchCardScreen({ searchText: v }));
          if (v === " ") {
            createNewProfile();
          }
        }}
      ></TextInput>
    </View>
  );
};
