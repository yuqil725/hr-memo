import React from "react";
import { TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SProfileItem from "../../../assets/styles/profileItem";
import { ApiProfileCollection } from "../../../backend/appwrite/service/database/collection/profile";
import { friendshipStage } from "../../../backend/constants";
import { Constants } from "../../../Constants";
import {
  IProfileDisplayItem,
  IProfileItem,
  IProfileScreenActivity,
  ISProfileDisplayItem,
} from "../../../interfaces/profile";
import { ISSearchCard } from "../../../interfaces/search";
import store from "../../../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeProfileScreenActivity,
  AChangeSingleSearchCard,
} from "../../../redux_modules/action";
import { TsToStr } from "../../../utils/dateUtil";
import { pascalize } from "../../../utils/stringUtil";
import SwipeableItem from "../../SwipeableItem";

export const ProfileItemRender = (
  profileItem: IProfileItem,
  profileScreenActivity: IProfileScreenActivity,
  key: any,
  value: any
) => {
  let apiPofile = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  const addDateString = (s: string, prefix: string = " ") => {
    if (s.startsWith(prefix)) {
      s = TsToStr(Date.now());
    }
    return s;
  };

  function onSwipeableCloseCallbackOnArray(
    direction: "left" | "right",
    onSwipeableCloseCallbackProps: any
  ) {
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
      let newValue = { [pascalize(key)]: data };
      apiPofile.updateDocument(profileItem.meta.documentId, newValue);
      store.dispatch(AChangeDisplayProfile({ [key]: data }));
    }
  }
  switch (typeof value) {
    case "string": {
      return (
        <TextInput
          value={value}
          onBlur={(e) => {
            let data = { [pascalize(key)]: e.nativeEvent.text };
            apiPofile.updateDocument(profileItem.meta.documentId, data);
            // #TODO: here we only assumed search card are made of string fields in profile,
            // which can change in the future
            if (Object.values(ISSearchCard).includes(key)) {
              store.dispatch(
                AChangeSingleSearchCard({
                  documentId: profileItem.meta.documentId,
                  [key]: e.nativeEvent.text,
                })
              );
            }
          }}
          onChangeText={(newValue) => {
            store.dispatch(AChangeDisplayProfile({ [key]: newValue }));
          }}
          style={SProfileItem.infoContent}
        />
      );
    }
    case "object": {
      switch (key) {
        // TODO: this case can be extended to a general dropdown
        case ISProfileDisplayItem.FriendshipStage: {
          return (
            <DropDownPicker
              multiple
              autoScroll
              mode="BADGE"
              extendableBadgeContainer
              textStyle={SProfileItem.infoContent}
              style={{
                borderWidth: 0,
                paddingLeft: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              open={profileScreenActivity.friendshipDropdownOpen}
              value={
                profileItem.display.friendshipStage
                  ? profileItem.display.friendshipStage
                  : null
              }
              items={Object.keys(friendshipStage).map(function (e, i) {
                return { label: e, value: e };
              })}
              setOpen={() => {
                store.dispatch(
                  AChangeProfileScreenActivity({
                    friendshipDropdownOpen:
                      !profileScreenActivity.friendshipDropdownOpen,
                  })
                );
              }}
              setValue={(callback: any) => {
                return callback(profileItem.display.friendshipStage);
              }}
              onSelectItem={(newItem) => {
                let newArray = newItem.map(function (e, i) {
                  return e.value;
                });
                store.dispatch(
                  AChangeDisplayProfile({
                    [key]: newArray,
                  })
                );
                apiPofile.updateDocument(profileItem.meta.documentId, {
                  [pascalize(key)]: newArray,
                });
              }}
            />
          );
        }
        case ISProfileDisplayItem.ImagePath: {
          return;
        }
        default: {
          // default is string[]
          if (!value || value.length === 0) {
            value = [""];
          }
          return value.map((v: any, index: any) => {
            return (
              <SwipeableItem
                key={index}
                onSwipeableCloseCallbackProps={{ key: key, index: index }}
                onSwipeableCloseCallback={onSwipeableCloseCallbackOnArray}
              >
                <View style={SProfileItem.infoList}>
                  <TextInput
                    returnKeyType="done"
                    keyboardType="default"
                    value={addDateString(v)}
                    placeholder={
                      "Swipe-> to Add, Swipe<- to Delete, Click to edit"
                    }
                    placeholderTextColor="#E6E6E6"
                    onBlur={(e) => {
                      let newArray = [...value];
                      newArray[index] = e.nativeEvent.text;
                      let data = { [pascalize(key)]: newArray };
                      apiPofile.updateDocument(
                        profileItem.meta.documentId,
                        data
                      );
                    }}
                    onChangeText={(newValue) => {
                      let newArray = [...value];
                      newArray[index] = newValue;
                      store.dispatch(
                        AChangeDisplayProfile({ [key]: newArray })
                      );
                    }}
                    style={SProfileItem.infoContent}
                  />
                </View>
              </SwipeableItem>
            );
          });
        }
      }
    }
  }
};
