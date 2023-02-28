import React from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import styles, { WHITE } from "../../assets/styles";
import { SSearch } from "../../assets/styles/search";
import { ApiProfileCollection } from "../../backend/appwrite/service/database/collection/profile";
import { ISearchCardScreen } from "../../interfaces/search";
import store from "../../redux_modules";
import { AChangeSearchCardScreen } from "../../redux_modules/action";
import { EMPTY_CARD } from "../../redux_modules/reducer/change_search_card_screen";

export const DeleteConfirmationModal = (
  searchCardScreen: ISearchCardScreen,
  apiProfileCollection: ApiProfileCollection,
  item: any
) => {
  return (
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
              <Text style={styles.bodyBold}>{item.name}'s</Text> namecard?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.roundedButtonSecondary}
                onPress={() => {
                  console.log("Deleting card", item);
                  apiProfileCollection.deleteDocument(item.documentId);
                  let newSearchCard = [...searchCardScreen.searchCard].filter(
                    (i) => {
                      return i.documentId != item.documentId;
                    }
                  );
                  store.dispatch(
                    AChangeSearchCardScreen({
                      searchCard: newSearchCard,
                      selectedCard: EMPTY_CARD,
                    })
                  );
                }}
              >
                <Text style={{ ...styles.bodyBold, color: WHITE }}>Yes</Text>
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
                <Text style={{ ...styles.bodyBold, color: WHITE }}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
