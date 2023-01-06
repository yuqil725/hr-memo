import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { CardItem, Icon } from "../components";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { Constants } from "../Constants";
import { objectFilterKey, objectMapKey } from "../backend/objectUtil";
import {
  ISearchCard,
  ISearchCardScreen,
  ISSearchCard,
} from "../interfaces/search";
import store, { RootState } from "../redux_modules";
import { AChangeSearchCardScreen } from "../redux_modules/action";
import { useSelector } from "react-redux";
import { SSearch } from "../assets/styles/search";
import {
  EMPTY_CARD,
  NEW_CARD,
} from "../redux_modules/reducer/change_search_card_screen";

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

  useEffect(() => {
    let promise = apiProfileCollection.listDocument();
    promise.then(
      function (response: any) {
        let newSearchState = {
          searchCard: response.documents.map((e: ISearchCard) => {
            return objectMapKey(objectFilterKey(e, ISSearchCard), ISSearchCard);
          }),
          selectedCard: EMPTY_CARD,
        };
        if (searchCardScreen.selectedCard.documentId != EMPTY_CARD.documentId) {
          let newSelectedCard = newSearchState.searchCard.filter(
            (e: ISearchCard) => {
              return e.documentId == searchCardScreen.selectedCard.documentId;
            }
          );
          if (newSelectedCard.length == 1) {
            newSearchState.selectedCard = newSelectedCard.at(0);
          }
        }
        newSearchState.searchCard.push(NEW_CARD);
        console.log("set search state", newSearchState);
        store.dispatch(AChangeSearchCardScreen(newSearchState));
      },
      function (error: any) {
        console.error(error);
      }
    );
  }, [searchCardScreen.renderScreen]);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Namecards</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={searchCardScreen.searchCard}
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
                store.dispatch(
                  AChangeSearchCardScreen({
                    longPress: !searchCardScreen.longPress,
                  })
                );
              }}
            >
              <CardItem {...item} />
              <View style={SSearch.centeredModel}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={
                    searchCardScreen.longPress &&
                    searchCardScreen.selectedCard.documentId == item.documentId
                  }
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    store.dispatch(
                      AChangeSearchCardScreen({
                        selectedCard: EMPTY_CARD,
                      })
                    );
                  }}
                >
                  <View style={SSearch.centeredModel}>
                    <View style={SSearch.modalView}>
                      <Text style={styles.title}>
                        Are you sure you want to delete{" "}
                        <Text style={styles.bodyBold}>{item.name}'s</Text>{" "}
                        namecard?
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          style={styles.roundedButtonSecondary}
                          onPress={() => {
                            console.log("Deleting card", item);
                            apiProfileCollection.deleteDocument(
                              item.documentId
                            );
                            let newSearchCard = [
                              ...searchCardScreen.searchCard,
                            ].filter((i) => {
                              return i.documentId != item.documentId;
                            });
                            store.dispatch(
                              AChangeSearchCardScreen({
                                searchCard: newSearchCard,
                                selectedCard: EMPTY_CARD,
                              })
                            );
                          }}
                        >
                          <Text style={{ ...styles.bodyBold, color: WHITE }}>
                            Yes
                          </Text>
                        </Pressable>
                        <Pressable
                          style={styles.roundedButtonPrimary}
                          onPress={() =>
                            store.dispatch(
                              AChangeSearchCardScreen({
                                selectedCard: EMPTY_CARD,
                              })
                            )
                          }
                        >
                          <Text style={{ ...styles.bodyBold, color: WHITE }}>
                            No
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Search;
