import React, { useRef, useState } from "react";
import {
  Alert,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import styles, { WHITE } from "../../../../../assets/styles";
import SProfileItem from "../../../../../assets/styles/profileItem";
import { SSearch } from "../../../../../assets/styles/search";
import { ApiProfileCollection } from "../../../../../backend/appwrite/service/database/collection/profile";
import { Constants } from "../../../../../Constants";
import {
  IProfileArrayItem,
  IProfileScreenActivity,
  ISProfileDisplayItem,
} from "../../../../../interfaces/profile";
import store, { RootState } from "../../../../../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeProfileScreenActivity,
} from "../../../../../redux_modules/action";
import { Pascalize, updateTodo } from "../../../../../utils/stringUtil";
import Checkbox from "../../../../common/checkbox";
import { ProfileConfig } from "../../../profileConfig";

export const ProfileTodoArrayItem: React.FC<IProfileArrayItem> = ({
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

  function setInputTextRef(index: number) {
    if (
      profileScreenActivity.focusItem?.k == k &&
      profileScreenActivity.focusItem.index == index
    ) {
      return inputTextRef;
    } else if (!profileScreenActivity.focusItem || !inputTextRef.current) {
      if (
        k == ProfileConfig.DEFAULT_FOCUS.key &&
        index == ProfileConfig.DEFAULT_FOCUS.index
      ) {
        return inputTextRef;
      }
    } else {
      return undefined;
    }
  }

  function moveFocusItem(k: string, index: number, step: 1 | -1) {
    const keys = Object.values(ISProfileDisplayItem);
    if (index + step == -1) {
      // move up to edge
      return { k: k, index: value.length - 1 };
    } else if (index + step == value.length) {
      // move down to edge
      return { k: k, index: 0 };
    } else {
      return { k: k, index: index + step };
    }
  }

  let profileScreenActivity: IProfileScreenActivity = useSelector(
    (state: RootState) => state.profileScreenActivity
  );

  const inputTextRef: React.MutableRefObject<TextInput | null> = useRef(null);

  return (
    <>
      {value.map((v: any, index: any) => {
        const checked = v && v.startsWith("-");
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
                          [Pascalize(deleteItem.key)]: deleteItem.data,
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
            <View style={SProfileItem.infoList}>
              <Checkbox
                checked={checked}
                onChecked={() => {
                  const newTodo = updateTodo(v, !checked);
                  let newArray = [...value];
                  newArray[index] = newTodo;
                  store.dispatch(AChangeDisplayProfile({ [k]: newArray }));
                  if (index > 0 && newArray[index].length == 0) {
                    newArray.splice(index, 1);
                  }
                  let data = { [Pascalize(k)]: newArray };
                  apiPofile.updateDocument(profileItem.meta.documentId, data);
                }}
                textInputProps={{
                  ref: setInputTextRef(index),
                  returnKeyType: "done",
                  keyboardType: "default",
                  value: valueHandler(updateTodo(v, false)),
                  placeholder: "New field",
                  placeholderTextColor: "#E6E6E6",
                  onBlur: (e: any) => {
                    let newArray = [...value];
                    newArray[index] = e.nativeEvent.text;
                    // delete empty item if not the first item
                    if (index > 0 && newArray[index].length == 0) {
                      newArray.splice(index, 1);
                    }
                    let data = { [Pascalize(k)]: newArray };
                    apiPofile.updateDocument(profileItem.meta.documentId, data);
                    // add empty first line if it becomes none empty
                    if (
                      newArray &&
                      newArray.length > 0 &&
                      newArray.at(0) != ""
                    ) {
                      newArray = ["", ...newArray];
                    }
                    store.dispatch(AChangeDisplayProfile({ [k]: newArray }));
                  },
                  onFocus: () => {
                    store.dispatch(
                      AChangeProfileScreenActivity({
                        focusItem: { k: k, index: index },
                      })
                    );
                  },
                  onKeyPress: (
                    e: NativeSyntheticEvent<TextInputKeyPressEventData>
                  ) => {
                    switch (e.nativeEvent.key) {
                      case "ArrowDown":
                        store.dispatch(
                          AChangeProfileScreenActivity({
                            focusItem: moveFocusItem(k, index, 1),
                          })
                        );
                        setTimeout(() => {
                          if (inputTextRef.current) {
                            inputTextRef.current.focus();
                          }
                        }, 50);
                        return;
                      case "ArrowUp":
                        store.dispatch(
                          AChangeProfileScreenActivity({
                            focusItem: moveFocusItem(k, index, -1),
                          })
                        );
                        setTimeout(() => {
                          if (inputTextRef.current) {
                            inputTextRef.current.focus();
                          }
                        }, 50);
                        return;
                    }
                  },
                  onLayout: () => {
                    if (inputTextRef.current) {
                      inputTextRef.current.focus();
                    }
                  },
                  onChangeText: (newValue: any) => {
                    let newArray = [...value];
                    newArray[index] = newValue;
                    store.dispatch(AChangeDisplayProfile({ [k]: newArray }));
                  },
                  onSubmitEditing: (event: any) => {
                    let newArray = [...value];
                    // delete focused empty item if not the first item
                    if (index > 0 && newArray[index].length == 0) {
                      newArray.splice(index, 1);
                      store.dispatch(
                        AChangeProfileScreenActivity({
                          focusItem: moveFocusItem(k, index, -1),
                        })
                      );
                    } else {
                      // add empty item after focused non-empty item
                      newArray.splice(index + 1, 0, "");
                      store.dispatch(
                        AChangeProfileScreenActivity({
                          focusItem: {
                            k: k,
                            index: Math.min(
                              Math.max(index + 1, 2),
                              newArray.length - 1
                            ),
                          },
                        })
                      );
                    }
                    store.dispatch(AChangeDisplayProfile({ [k]: newArray }));
                  },
                  style: SProfileItem.infoContent,
                }}
              />
            </View>
          </React.Fragment>
        );
      })}
    </>
  );
};
