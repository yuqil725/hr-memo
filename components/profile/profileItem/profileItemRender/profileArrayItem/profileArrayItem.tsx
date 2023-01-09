import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import styles, { WHITE } from "../../../../../assets/styles";
import SProfileItem from "../../../../../assets/styles/profileItem";
import { SSearch } from "../../../../../assets/styles/search";
import { ApiProfileCollection } from "../../../../../backend/appwrite/service/database/collection/profile";
import { Constants } from "../../../../../Constants";
import {
  IProfileArrayItem,
  IProfileDisplayItem,
} from "../../../../../interfaces/profile";
import store from "../../../../../redux_modules";
import { AChangeDisplayProfile } from "../../../../../redux_modules/action";
import { pascalize } from "../../../../../utils/stringUtil";
import SwipeableItem from "../../../../SwipeableItem";

export const ProfileArrayItem: React.FC<IProfileArrayItem> = ({
  value,
  valueHandler,
  k,
  profileItem,
}: IProfileArrayItem) => {
  const [deleteItem, setDeleteItem] = useState<undefined | any>(undefined);
  let apiPofile = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  function onSwipeableCloseCallbackOnArray(
    direction: "left" | "right",
    onSwipeableCloseCallbackProps: any
  ) {
    const key = onSwipeableCloseCallbackProps.key;
    // only applicable to Array
    if (direction == "left") {
      console.log(`Adding new empty item`);
      let data: string[] = [
        ...profileItem.display[
          onSwipeableCloseCallbackProps.key as keyof IProfileDisplayItem
        ],
      ];
      data.splice(onSwipeableCloseCallbackProps.index + 1, 0, "");
      let newValue = { [pascalize(key)]: data };
      apiPofile.updateDocument(profileItem.meta.documentId, newValue);
      store.dispatch(AChangeDisplayProfile({ [key]: data }));
    } else if (direction == "right") {
      let data: string[] = [
        ...profileItem.display[
          onSwipeableCloseCallbackProps.key as keyof IProfileDisplayItem
        ],
      ];
      const dataDeleted = data.splice(onSwipeableCloseCallbackProps.index, 1);
      console.log(`Deleting item ${dataDeleted}`);
      setDeleteItem({ key: key, data: data });
    }
  }

  return (
    <>
      {value.map((v: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={deleteItem != undefined}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setDeleteItem(undefined);
              }}
            >
              <View style={SSearch.centeredModel}>
                <View style={SSearch.modalView}>
                  <Text style={styles.title}>
                    Are you sure you want to delete?
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={styles.roundedButtonSecondary}
                      onPress={() => {
                        let newValue = {
                          [pascalize(deleteItem.key)]: deleteItem.data,
                        };
                        apiPofile.updateDocument(
                          profileItem.meta.documentId,
                          newValue
                        );
                        store.dispatch(
                          AChangeDisplayProfile({
                            [deleteItem.key]: deleteItem.data,
                          })
                        );
                        setDeleteItem(undefined);
                      }}
                    >
                      <Text style={{ ...styles.bodyBold, color: WHITE }}>
                        Yes
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.roundedButtonPrimary}
                      onPress={() => {
                        setDeleteItem(undefined);
                      }}
                    >
                      <Text style={{ ...styles.bodyBold, color: WHITE }}>
                        No
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <SwipeableItem
              onSwipeableCloseCallbackProps={{ key: k, index: index }}
              onSwipeableCloseCallback={onSwipeableCloseCallbackOnArray}
            >
              <View style={SProfileItem.infoList}>
                <TextInput
                  returnKeyType="done"
                  keyboardType="default"
                  value={valueHandler(v)}
                  placeholder={"New field"}
                  placeholderTextColor="#E6E6E6"
                  onBlur={(e) => {
                    let newArray = [...value];
                    newArray[index] = e.nativeEvent.text;
                    let data = { [pascalize(k)]: newArray };
                    apiPofile.updateDocument(profileItem.meta.documentId, data);
                    // add empty first line if it becomes none empty
                    if (value && value.length > 0 && value.at(0) != "") {
                      value = ["", ...value];
                    }
                    store.dispatch(AChangeDisplayProfile({ [k]: value }));
                  }}
                  onChangeText={(newValue) => {
                    let newArray = [...value];
                    newArray[index] = newValue;
                    store.dispatch(AChangeDisplayProfile({ [k]: newArray }));
                  }}
                  style={SProfileItem.infoContent}
                />
              </View>
            </SwipeableItem>
          </React.Fragment>
        );
      })}
    </>
  );
};
