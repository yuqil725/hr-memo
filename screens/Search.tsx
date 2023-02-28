import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ImageBackground,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { CardItem } from "../components";
import { DeleteConfirmationModal } from "../components/search/deleteConfirmationModal";
import { SearchBar } from "../components/search/searchBar";
import { Constants } from "../Constants";
import {
  ISearchCard,
  ISearchCardScreen,
  ISSearchCard,
} from "../interfaces/search";
import store, { RootState } from "../redux_modules";
import { AChangeSearchCardScreen } from "../redux_modules/action";
import {
  EMPTY_CARD,
  NEW_CARD,
} from "../redux_modules/reducer/change_search_card_screen";
import { objectFilterKey, objectMapKey } from "../utils/objectUtil";
import { ProcessName } from "../utils/stringUtil";

const Search = ({ navigation }: { navigation: any }) => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let searchCardScreen: ISearchCardScreen = useSelector(
    (state: RootState) => state.searchCardScreen
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  function namecardArrayToSection(namecardArray: ISearchCard[]) {
    const namecardObject = namecardArray.reduce((acc: any, nc: any) => {
      const processedName = ProcessName(nc.name);
      processedName.startsWith(
        searchCardScreen.searchText
          ? searchCardScreen.searchText.toLowerCase()
          : " "
      );
      const firstLetter = processedName.at(0) ? processedName.at(0) : "";
      acc[firstLetter] = acc[firstLetter] || [];
      acc[firstLetter].push(nc);
      return acc;
    }, {});
    return Object.keys(namecardObject).map((k) => {
      return { title: k.toUpperCase(), data: namecardObject[k] };
    });
  }

  useFocusEffect(
    useCallback(() => {
      let promise = apiProfileCollection.listDocument();
      promise.then(
        function (response: any) {
          let tagSelection = [
            ...new Set(
              response.documents
                .map((e: any) => {
                  return e.Tag.filter((e: string) => e.length > 0);
                })
                .reduce(
                  (accumulator: string[], value: string[]) =>
                    accumulator.concat(value),
                  []
                )
            ),
          ].sort();
          let newSearchState = {
            searchCard: response.documents
              .map((e: ISearchCard) => {
                return objectMapKey(
                  objectFilterKey(e, ISSearchCard),
                  ISSearchCard
                );
              })
              .sort((a: ISearchCard, b: ISearchCard) => {
                return ProcessName(a.name) < ProcessName(b.name) ? -1 : 1;
              }),
            selectedCard: EMPTY_CARD,
            tagSelection: tagSelection,
          };
          if (
            searchCardScreen.selectedCard.documentId != EMPTY_CARD.documentId
          ) {
            let newSelectedCard = newSearchState.searchCard.filter(
              (e: ISearchCard) => {
                return e.documentId == searchCardScreen.selectedCard.documentId;
              }
            );
            if (newSelectedCard.length == 1) {
              newSearchState.selectedCard = newSelectedCard.at(0);
            }
          }
          newSearchState.searchCard.unshift(NEW_CARD);
          console.log("set search state", newSearchState);
          store.dispatch(AChangeSearchCardScreen(newSearchState));
        },
        function (error: any) {
          console.error(error);
        }
      );
      setRefreshing(false);
    }, [searchCardScreen.renderScreen])
  );

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        {SearchBar(searchCardScreen, apiProfileCollection, navigation)}

        <SectionList
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                store.dispatch(
                  AChangeSearchCardScreen({ renderScreen: Math.random() })
                );
                setRefreshing(true);
              }}
            />
          }
          sections={namecardArrayToSection(searchCardScreen.searchCard)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.title}>{title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                store.dispatch(
                  AChangeSearchCardScreen({
                    selectedCard: item,
                  })
                );
                if (!searchCardScreen.longPress) {
                  navigation.navigate("Profile");
                }
              }}
              onLongPress={() => {
                if (item.documentId != NEW_CARD.documentId) {
                  store.dispatch(
                    AChangeSearchCardScreen({
                      longPress: !searchCardScreen.longPress,
                      selectedCard: item,
                    })
                  );
                }
              }}
              style={{ flex: 1 }}
            >
              <CardItem {...item} oneline />
              {/* Modal */}
              {DeleteConfirmationModal(
                searchCardScreen,
                apiProfileCollection,
                item
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Search;
