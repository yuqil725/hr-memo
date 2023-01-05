import React, { useEffect, useRef } from "react";
import { Text, View, Image, Dimensions, Animated } from "react-native";
import { SCardItem } from "../assets/styles/card_item";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { snakeCase } from "../backend/stringUtil";
import { Constants } from "../Constants";
import { ISearchCard, ISearchCardScreen } from "../interfaces/search";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { GRAY } from "../assets/styles";
import { RootState } from "../redux_modules";
import { useSelector } from "react-redux";

const CardItem = (props: ISearchCard) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = {
    borderRadius: 8,
    width: fullWidth / 2 - 30,
    height: 170,
    margin: 0,
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

  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  // #TODO: need to change once supporting multiple images
  let imageName = snakeCase(props.name + " 1");

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
        {/* IMAGE */}
        {props.imagePath && props.imagePath.length > 0 ? (
          <Image
            source={{
              uri: apiProfileBucket.getFilePreview(imageName).toString(),
            }}
            style={imageStyle}
          />
        ) : undefined}

        {props.imagePath && props.imagePath.length === 0 ? (
          <View
            style={{
              ...imageStyle,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        ) : undefined}

        {!props.imagePath ? (
          <View
            style={{
              ...imageStyle,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-person-add"
              size={120}
              color={GRAY}
              style={{ width: 120 }}
            />
          </View>
        ) : undefined}

        {/* NAME */}
        <Text style={nameStyle}>{props.name}</Text>
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
