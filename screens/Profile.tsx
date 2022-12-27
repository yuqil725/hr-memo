import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import { ApiProfile } from "../backend/appwrite/service/collection/profile";
import { Constants } from "../Constants";
import store from "../redux_modules";
import {
  AChangeDisplayProfile,
  AChangeMetaProfile,
} from "../redux_modules/action";
import { ISProfileDisplayItem, ISProfileMetaItem } from "../types";
import { objectFilterKey, objectMapKey } from "../backend/objectUtil";

const Profile = () => {
  let apiPofile = new ApiProfile(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  useEffect(() => {
    let promise = apiPofile.queryByName("Yuqi Li");
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
        console.log("set state", {
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

  const { age, image, info1, info2, info3, info4, location, match, name } =
    DEMO[7];

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        height: "100%",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.bg}
      >
        <ScrollView style={styles.containerProfile}>
          <ImageBackground source={image} style={styles.photo}>
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
