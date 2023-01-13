import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../assets/styles";
import { IProfileOneLine } from "../interfaces/general";

const ProfileOneLine = ({
  image,
  lastMessage,
  name,
  disabled,
  onPress,
}: IProfileOneLine) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        ...styles.containerMessage,
        opacity: disabled ? 0.5 : undefined,
      }}
    >
      <Image source={image} style={styles.avatar} />
      <View>
        <Text>{name}</Text>
        <Text
          style={{
            ...styles.message,
            textDecorationLine: disabled ? "line-through" : undefined,
          }}
        >
          {lastMessage}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default ProfileOneLine;
