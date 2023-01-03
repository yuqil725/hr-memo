import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { SCardItem } from "../assets/styles/card_item";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { snakeCase } from "../backend/stringUtil";
import { Constants } from "../Constants";
import { ISearchCard } from "../interfaces/search";
import { Ionicons } from "@expo/vector-icons";
import { GRAY } from "../assets/styles";

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

  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  // #TODO: need to change once supporting multiple images
  let imageName = snakeCase(props.name + " 1");

  return (
    <View style={SCardItem.containerCardItem}>
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
  );
};

export default CardItem;
