import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import { IScreenActivity, TProfileItem } from "../types";
import { AChangeProfile, AChangeScreenActivity } from "../redux_modules/action";
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
          onFocus={(e) => {
            store.dispatch(AChangeScreenActivity({ viewOffsetEnable: true }));
          }}
          onBlur={(e) => {
            store.dispatch(AChangeScreenActivity({ viewOffsetEnable: false }));
          }}
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
                onFocus={(e) => {
                  store.dispatch(
                    AChangeScreenActivity({ viewOffsetEnable: true })
                  );
                }}
                onBlur={(e) => {
                  store.dispatch(
                    AChangeScreenActivity({ viewOffsetEnable: false })
                  );
                }}
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
  let screenActivity: IScreenActivity = useSelector(
    (state: RootState) => state.screenActivity
  );

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled={screenActivity.pageY > 500 && screenActivity.viewOffsetEnable}
    >
      <View
        style={SProfileItem.containerProfileItem}
        onTouchStart={(e) => {
          store.dispatch(AChangeScreenActivity({ pageY: e.nativeEvent.pageY }));
        }}
      >
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
    </KeyboardAvoidingView>
  );
};

export default ProfileItem;
