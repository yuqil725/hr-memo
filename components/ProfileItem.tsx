import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import {
  IProfileDisplayItem,
  IProfileItem,
  IProfileScreenActivity,
  ISProfileDisplayItem,
} from "../types";
import {
  AChangeDisplayProfile,
  AChangeProfileScreenActivity,
} from "../redux_modules/action";
import store, { RootState } from "../redux_modules";
import { useSelector } from "react-redux";
import SProfileItem from "../assets/styles/profileItem";
import { pascalize } from "../backend/stringUtil";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import DropDownPicker from "react-native-dropdown-picker";
import { Constants } from "../Constants";
import { friendshipStage } from "../backend/constants";

const displayItem = (
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
  switch (typeof value) {
    case "string": {
      return (
        <TextInput
          key={key}
          value={value}
          onFocus={(e) => {
            store.dispatch(
              AChangeProfileScreenActivity({ viewOffsetEnable: true })
            );
          }}
          onBlur={(e) => {
            store.dispatch(
              AChangeProfileScreenActivity({ viewOffsetEnable: false })
            );
            let data = { [pascalize(key)]: e.nativeEvent.text };
            apiPofile.updateDocument(profileItem.meta.documentId, data);
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
                console.log(key, newItem);
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
        case ISProfileDisplayItem.Image: {
          return;
        }
        default: {
          if (value) {
            return value.map((v: any, index: any) => {
              return (
                <View key={index} style={SProfileItem.infoList}>
                  <TextInput
                    multiline
                    value={v}
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
              );
            });
          }
        }
      }
    }
  }
};

const ProfileItem = () => {
  let profileItem: IProfileItem = useSelector(
    (state: RootState) => state.profile
  );
  let profileDisplayItem: IProfileDisplayItem = profileItem.display;
  let profileScreenActivity: IProfileScreenActivity = useSelector(
    (state: RootState) => state.profileScreenActivity
  );

  return (
    <View style={SProfileItem.containerProfileItem}>
      {Object.values(profileDisplayItem).map((value: any, index) => {
        if (Object.keys(profileDisplayItem).at(index)!.at(0) !== "$" && value)
          return (
            // zIndex should be high if the display item is dropdown
            // #TODO: make it more generic instead of hardcoded
            <View
              key={index}
              style={{
                ...SProfileItem.infoSectionView,
                zIndex:
                  Object.keys(profileDisplayItem).at(index) ===
                  ISProfileDisplayItem.FriendshipStage
                    ? 1
                    : 0,
              }}
            >
              <View style={SProfileItem.infoSectionTitleView}>
                <Text style={SProfileItem.infoSectionText}>
                  {pascalize(Object.keys(profileDisplayItem).at(index))}
                  :&nbsp;
                </Text>
              </View>
              <View style={SProfileItem.infoSectionContent}>
                {displayItem(
                  profileItem,
                  profileScreenActivity,
                  Object.keys(profileDisplayItem).at(index),
                  value
                )}
              </View>
            </View>
          );
      })}
    </View>
  );
};

export default ProfileItem;
