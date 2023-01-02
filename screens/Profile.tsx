import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { Constants } from "../Constants";
import store, { RootState } from "../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeMetaProfile,
} from "../redux_modules/action";
import {
  IProfileItem,
  ISProfileDisplayItem,
  ISProfileMetaItem,
} from "../interfaces/profile";
import { objectFilterKey, objectMapKey } from "../backend/objectUtil";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { useSelector } from "react-redux";
import { ISearchCardScreen } from "../interfaces/search";

const Profile = () => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  let searchCardScreen: ISearchCardScreen = useSelector(
    (state: RootState) => state.searchCardScreen
  );

  useEffect(() => {
    let promise = apiProfileCollection.queryByName(
      searchCardScreen.selectedName
    );
    promise.then(
      function (response: any) {
        console.log("Profile.tsx", response);
        let newDisplayState = objectMapKey(
          objectFilterKey(response.documents[0], ISProfileDisplayItem),
          ISProfileDisplayItem
        );
        let newMetaState = objectMapKey(
          objectFilterKey(response.documents[0], ISProfileMetaItem),
          ISProfileMetaItem
        );
        console.log("set profile state", {
          display: newDisplayState,
          meta: newMetaState,
        });
        store.dispatch(AChangeDisplayProfile(newDisplayState));
        store.dispatch(AChangeMetaProfile(newMetaState));
      },
      function (error: any) {
        console.error(error);
      }
    );
  }, []);

  let profileItem: IProfileItem = useSelector(
    (state: RootState) => state.profile
  );

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{
          uri: apiProfileBucket.getFilePreview("daniel_acosta_1").toString(),
        }}
        style={styles.bg}
      >
        <ScrollView style={styles.containerProfile}>
          <ImageBackground
            source={profileItem.display.image}
            style={styles.photo}
          >
            <View style={styles.top}>
              <TouchableOpacity>
                <Icon
                  name="chevron-back"
                  size={20}
                  color={WHITE}
                  style={styles.topIconLeft}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon
                  name="ellipsis-vertical"
                  size={20}
                  color={WHITE}
                  style={styles.topIconRight}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <ProfileItem />
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Profile;
