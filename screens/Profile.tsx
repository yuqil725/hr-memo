import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import { ApiPofile } from "../backend/appwrite/service/collection/profile";
import { Constants } from "../Constants";
import store from "../redux_modules";
import { AChangeProfile } from "../redux_modules/action";
import { TSProfileItem } from "../types";

const Profile = () => {
  let apiPofile = new ApiPofile(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let promise = apiPofile.queryByName("Yuqi Li");

  useEffect(() => {
    promise.then(
      function (response: any) {
        console.log("set state", response.documents[0]);
        const newState = Object.fromEntries(
          Object.entries(response.documents[0]).filter(([key]) =>
            TSProfileItem.includes(key)
          )
        );
        store.dispatch(AChangeProfile(newState));
      },
      function (error: any) {
        console.error(error);
      }
    );
  }, []);

  const { age, image, info1, info2, info3, info4, location, match, name } =
    DEMO[7];

  return (
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
  );
};

export default Profile;
