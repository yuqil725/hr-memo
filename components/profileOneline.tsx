import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { IProfileOneLine } from "../interfaces/general";
import styles from "../assets/styles";

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
