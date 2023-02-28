import React from "react";
import { TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SProfileItem from "../../../assets/styles/profileItem";
import { ApiProfileCollection } from "../../../backend/appwrite/service/database/collection/profile";
import { friendshipStage } from "../../../backend/constants";
import { Constants } from "../../../Constants";
import {
  IProfileItem,
  IProfileScreenActivity,
  ISProfileDisplayItem,
} from "../../../interfaces/profile";
import { ISearchCardScreen, ISSearchCard } from "../../../interfaces/search";
import store from "../../../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeProfileScreenActivity,
  AChangeSearchCardScreen,
  AChangeSingleSearchCard,
} from "../../../redux_modules/action";
import { TsToStr } from "../../../utils/dateUtil";
import { Pascalize } from "../../../utils/stringUtil";
import { ProfileArrayItem } from "./profileItemRender/profileArrayItem/profileArrayItem";
import { ProfileTodoArrayItem } from "./profileItemRender/profileTodoItem/profileTodoArrayItem";

export const ProfileItemRender = (
  profileItem: IProfileItem,
  profileScreenActivity: IProfileScreenActivity,
  key: any,
  value: any,
  searchCardScreen: ISearchCardScreen
) => {
  let apiPofile = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );
  const addDateString = (s: string, prefix: string = " ") => {
    if (s.startsWith(prefix)) {
      s = TsToStr(Date.now()) + s;
    }
    return s;
  };

  switch (typeof value) {
    case "string": {
      return (
        <TextInput
          value={value}
          onBlur={(e) => {
            const text = e.nativeEvent.text.trimStart();
            let data = { [Pascalize(key)]: text };
            apiPofile.updateDocument(profileItem.meta.documentId, data);
            // #TODO: here we only assumed search card are made of string fields in profile,
            // which can change in the future
            if (Object.values(ISSearchCard).includes(key)) {
              store.dispatch(
                AChangeSingleSearchCard({
                  documentId: profileItem.meta.documentId,
                  [key]: text,
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
              dropDownDirection="BOTTOM"
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
                  [Pascalize(key)]: newArray,
                });
              }}
            />
          );
        }
        case ISProfileDisplayItem.Tag: {
          const addNewTagStr = "Add new tag";
          return (
            <React.Fragment>
              {profileScreenActivity.createNewTag ? (
                <TextInput
                  autoFocus
                  placeholder={addNewTagStr}
                  style={SProfileItem.addNewTagInput}
                  onBlur={(e) => {
                    const text = e.nativeEvent.text.trimStart();
                    if (text.length > 0) {
                      let tagSelection = searchCardScreen.tagSelection!;
                      tagSelection = [...tagSelection, text];
                      store.dispatch(
                        AChangeSearchCardScreen({ tagSelection: tagSelection })
                      );

                      const newArray = [
                        ...profileItem.display.tag!,
                        text,
                      ].filter((n) => typeof n === "string" && n.length > 0);
                      store.dispatch(
                        AChangeDisplayProfile({
                          [key]: newArray,
                        })
                      );
                      apiPofile.updateDocument(profileItem.meta.documentId, {
                        [Pascalize(key)]: newArray,
                      });
                    }
                    store.dispatch(
                      AChangeProfileScreenActivity({
                        tagDropdownOpen: false,
                        createNewTag: false,
                      })
                    );
                  }}
                />
              ) : (
                <DropDownPicker
                  multiple
                  autoScroll
                  mode="BADGE"
                  dropDownDirection="BOTTOM"
                  extendableBadgeContainer
                  textStyle={SProfileItem.infoContent}
                  style={{
                    borderWidth: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    minHeight: 40,
                  }}
                  open={profileScreenActivity.tagDropdownOpen}
                  value={
                    profileItem.display.tag ? profileItem.display.tag : null
                  }
                  items={[addNewTagStr, ...searchCardScreen.tagSelection!].map(
                    function (e, i) {
                      return { label: e, value: e };
                    }
                  )}
                  setOpen={() => {
                    store.dispatch(
                      AChangeProfileScreenActivity({
                        tagDropdownOpen: !profileScreenActivity.tagDropdownOpen,
                      })
                    );
                  }}
                  setValue={(callback: any) => {
                    return callback(profileItem.display.tag);
                  }}
                  onSelectItem={(items) => {
                    console.log("selectItem");
                    let newArray = items.map((e) => e.value);
                    const index = newArray.indexOf(addNewTagStr);
                    if (index !== -1) {
                      store.dispatch(
                        AChangeProfileScreenActivity({
                          createNewTag: true,
                        })
                      );
                      newArray.splice(index, 1);
                    }
                    store.dispatch(
                      AChangeDisplayProfile({
                        [key]: newArray,
                      })
                    );
                    apiPofile.updateDocument(profileItem.meta.documentId, {
                      [Pascalize(key)]: newArray,
                    });
                  }}
                />
              )}
            </React.Fragment>
          );
        }
        case ISProfileDisplayItem.ImagePath: {
          return;
        }
        case ISProfileDisplayItem.Todo: {
          return (
            <ProfileTodoArrayItem
              value={value}
              valueHandler={addDateString}
              k={key}
              profileItem={profileItem}
            />
          );
        }
        default: {
          // default is string[]
          if (key) {
            if (!value || value.length === 0) {
              value = [""];
            }
            return (
              <ProfileArrayItem
                value={value}
                valueHandler={addDateString}
                k={key}
                profileItem={profileItem}
              />
            );
          }
        }
      }
    }
  }
};
