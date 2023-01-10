import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import SProfileItem from "../../assets/styles/profileItem";
import {
  IProfileDisplayItem,
  IProfileItem,
  IProfileScreenActivity,
  ISProfileDisplayItem,
} from "../../interfaces/profile";
import { RootState } from "../../redux_modules";
import { Pascalize } from "../../utils/stringUtil";
import { ProfileItemRender } from "./profileItem/profileItemRender";

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
        if (
          Object.keys(profileDisplayItem).at(index)!.at(0) !== "$" &&
          Object.keys(profileDisplayItem).at(index)! !==
            ISProfileDisplayItem.ImagePath
        )
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
                  {Pascalize(Object.keys(profileDisplayItem).at(index))}
                  :&nbsp;
                </Text>
              </View>

              <View style={SProfileItem.infoSectionContent}>
                {ProfileItemRender(
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
