import React from "react";
import { Text, TextInput, View } from "react-native";
import { TProfileItem } from "../types";
import { AChangeProfile } from "../redux_modules/action";
import store, { RootState } from "../redux_modules";
import { useSelector } from "react-redux";
import SProfileItem from "../assets/styles/profileItem";

const displayItem = (key: any, value: any) => {
  switch (typeof value) {
    case "string": {
      return (
        <TextInput
          key={key}
          value={value}
          onChangeText={(newValue) => {
            store.dispatch(AChangeProfile({ [key]: newValue }));
          }}
          style={SProfileItem.infoContent}
        />
      );
    }
    case "object": {
      if (value) {
        return value.map((v: any, index: any) => {
          return (
            <View key={index} style={SProfileItem.infoList}>
              <TextInput
                multiline
                value={v}
                onChangeText={(newValue) => {
                  let newArray = [...value];
                  newArray[index] = newValue;
                  store.dispatch(AChangeProfile({ [key]: newArray }));
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
  let profileItem: TProfileItem = useSelector(
    (state: RootState) => state.profile
  );
  return (
    <View style={SProfileItem.containerProfileItem}>
      {Object.values(profileItem).map((value: any, index) => {
        if (
          Object.keys(profileItem).at(index)!.at(0) !== "$" &&
          value &&
          value != ""
        )
          return (
            <View key={index} style={SProfileItem.infoSectionView}>
              <View style={SProfileItem.infoSectionTitleView}>
                <Text style={SProfileItem.infoSectionText}>
                  {Object.keys(profileItem).at(index)}:&nbsp;
                </Text>
              </View>
              <View style={SProfileItem.infoSectionContent}>
                {displayItem(Object.keys(profileItem).at(index), value)}
              </View>
            </View>
          );
      })}
    </View>
  );
};

export default ProfileItem;
