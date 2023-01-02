import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { Constants } from "../Constants";

const Search = () => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );
  useEffect(() => {
    let promise = apiProfileCollection.queryByName("Daniel Acosta");
    promise.then(
      function (response: any) {
        console.log("Search.tsx", response);
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

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Namecards</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem
                image={item.image}
                name={item.name}
                isOnline={item.isOnline}
                hasVariant
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Search;
