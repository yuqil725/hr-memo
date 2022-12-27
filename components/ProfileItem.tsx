import React from "react";
import { Text, TextInput, View } from "react-native";
import { IScreenActivity, IProfileDisplayItem, IProfileItem } from "../types";
import {
  AChangeDisplayProfile,
  AChangeScreenActivity,
} from "../redux_modules/action";
import store, { RootState } from "../redux_modules";
import { useSelector } from "react-redux";
import SProfileItem from "../assets/styles/profileItem";
import { pascalize } from "../backend/stringUtil";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { Constants } from "../Constants";

const displayItem = (profileItem: IProfileItem, key: any, value: any) => {
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
            store.dispatch(AChangeScreenActivity({ viewOffsetEnable: true }));
          }}
          onBlur={(e) => {
            store.dispatch(AChangeScreenActivity({ viewOffsetEnable: false }));
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
      if (value && key !== "image") {
        return value.map((v: any, index: any) => {
          return (
            <View key={index} style={SProfileItem.infoList}>
              <TextInput
                multiline
                value={v}
                onFocus={(e) => {
                  store.dispatch(
                    AChangeScreenActivity({ viewOffsetEnable: true })
                  );
                }}
                onBlur={(e) => {
                  store.dispatch(
                    AChangeScreenActivity({ viewOffsetEnable: false })
                  );
                  let newArray = [...value];
                  newArray[index] = e.nativeEvent.text;
                  let data = { [pascalize(key)]: newArray };
                  apiPofile.updateDocument(profileItem.meta.documentId, data);
                }}
                onChangeText={(newValue) => {
                  let newArray = [...value];
                  newArray[index] = newValue;
                  store.dispatch(AChangeDisplayProfile({ [key]: newArray }));
                }}
                style={SProfileItem.infoContent}
              />
            </View>
          );
        });
      }
    }
  }
};

const ProfileItem = () => {
  let profileItem: IProfileItem = useSelector(
    (state: RootState) => state.profile
  );
  let profileDisplayItem: IProfileDisplayItem = profileItem.display;
  let screenActivity: IScreenActivity = useSelector(
    (state: RootState) => state.screenActivity
  );

  return (
    <View style={SProfileItem.containerProfileItem}>
      {Object.values(profileDisplayItem).map((value: any, index) => {
        if (
          Object.keys(profileDisplayItem).at(index)!.at(0) !== "$" &&
          value &&
          value != ""
        )
          return (
            <View key={index} style={SProfileItem.infoSectionView}>
              <View style={SProfileItem.infoSectionTitleView}>
                <Text style={SProfileItem.infoSectionText}>
                  {pascalize(Object.keys(profileDisplayItem).at(index))}
                  :&nbsp;
                </Text>
              </View>
              <View style={SProfileItem.infoSectionContent}>
                {displayItem(
                  profileItem,
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
