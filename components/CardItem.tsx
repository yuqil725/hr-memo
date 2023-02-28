import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { DARK_GRAY, GRAY, stringToColour } from "../assets/styles";
import { SCardItem } from "../assets/styles/card_item";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { Constants } from "../Constants";
import { ISearchCard, ISearchCardScreen } from "../interfaces/search";
import store, { RootState } from "../redux_modules";
import { AChangeSearchCardScreen } from "../redux_modules/action";
import { NEW_CARD } from "../redux_modules/reducer/change_search_card_screen";
import Icon from "./common/Icon";

const CardItem = (props: ISearchCard) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = {
    borderRadius: 8,
    width: props.oneline ? 40 : fullWidth / 2 - 30,
    height: props.oneline ? 40 : 170,
  };
  const nameStyle = [
    {
      paddingTop: 10,
      paddingBottom: 5,
      color: "#363636",
      fontSize: 15,
    },
  ];

  const anim = useRef(new Animated.Value(0));

  let searchCardScreen: ISearchCardScreen = useSelector(
    (state: RootState) => state.searchCardScreen
  );

  const shakeLoop = Animated.loop(
    // runs the animation array in sequence
    Animated.sequence([
      // shift element to the left by 2 units
      Animated.timing(anim.current, {
        toValue: -2,
        duration: 25,
        useNativeDriver: false,
      }),
      // shift element to the right by 2 units
      Animated.timing(anim.current, {
        toValue: 2,
        duration: 25,
        useNativeDriver: false,
      }),
      // bring the element back to its original position
      Animated.timing(anim.current, {
        toValue: 0,
        duration: 25,
        useNativeDriver: false,
      }),
    ]),
    // loops the above animation config 2 times
    { iterations: -1 }
  );

  useEffect(() => {
    searchCardScreen.longPress && props.imagePath
      ? shakeLoop.start()
      : shakeLoop.reset();
  }, [searchCardScreen.longPress]);

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

  // #TODO: need to change once supporting multiple images

  const nameSection = () => {
    {
      /* NAME */
    }
    return (
      <View
        style={{
          ...SCardItem.nameView,
          paddingLeft: props.oneline ? 10 : undefined,
        }}
      >
        <View>
          <Text style={nameStyle}>{props.name}</Text>
        </View>
        <View style={{ ...SCardItem.tagContainer }}>
          {props.tag?.map((t) => {
            return (
              <View
                style={{
                  ...SCardItem.tagView,
                  backgroundColor: stringToColour(t),
                }}
              >
                <Text style={{ ...SCardItem.tagText }}>{t}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: anim.current.interpolate({
              inputRange: [-1, 1],
              outputRange: ["-0.005rad", "0.005rad"],
            }),
          },
        ],
      }}
    >
      <View style={{ ...SCardItem.containerCardItem }}>
        {/* namecard with image */}
        {props.imagePath && props.imagePath.length > 0 ? (
          <React.Fragment>
            <Image
              source={{
                uri: apiProfileBucket
                  .getFilePreview(props.imagePath)
                  .toString(),
              }}
              style={imageStyle}
            />
            {nameSection()}
          </React.Fragment>
        ) : undefined}

        {/* namecard without image */}
        {props.imagePath && props.imagePath.length === 0 ? (
          <React.Fragment>
            <View
              style={{
                ...imageStyle,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={"person-circle"} size={42} color={DARK_GRAY} />
            </View>

            {nameSection()}
          </React.Fragment>
        ) : undefined}

        {/* placeholder namecard used to create new namecard */}
        {!props.imagePath ? (
          <React.Fragment>
            <TouchableOpacity
              onPress={() => {
                if (!searchCardScreen.longPress) {
                  console.log("Creating a new namecard");
                  const promise = apiProfileCollection.createDocument({
                    Name: NEW_CARD.name,
                  });
                  promise.then(
                    function (response: any) {
                      store.dispatch(
                        AChangeSearchCardScreen({ renderScreen: Math.random() })
                      );
                    },
                    function (error: any) {
                      console.error(error);
                    }
                  );
                }
                return;
              }}
              style={{ flexDirection: "row", width: "100%" }}
            >
              <View
                style={{
                  ...imageStyle,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-person-add"
                  size={props.oneline ? 40 : 120}
                  color={GRAY}
                  // style={{ width: "100%" }}
                />
              </View>
              {nameSection()}
            </TouchableOpacity>
          </React.Fragment>
        ) : undefined}
      </View>

      {/* Remove Icon */}
      {searchCardScreen.longPress && props.imagePath ? (
        <FontAwesome
          name="remove"
          size={25}
          color="red"
          style={{
            alignSelf: "flex-end",
            marginTop: -2,
            position: "absolute",
          }}
        />
      ) : undefined}
    </Animated.View>
  );
};

export default CardItem;
