import React, { Component, PropsWithChildren } from "react";
import { Animated } from "react-native";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { SSwipeableItem } from "../assets/styles/swipeableItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ISwipeableItem } from "../interfaces/profile";
import vibrate from "./common/vibrate";

export default class SwipeableItem extends Component<
  PropsWithChildren<ISwipeableItem>
> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={SSwipeableItem.leftAction}>
        <Animated.Text
          style={[
            SSwipeableItem.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Entypo name="add-to-list" size={24} color="white" />
        </Animated.Text>
      </RectButton>
    );
  };

  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-1, 0, 0, -20],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={SSwipeableItem.rightAction}>
        <Animated.Text
          style={[
            SSwipeableItem.actionText,
            {
              alignSelf: "center",
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={24}
            color="white"
          />
        </Animated.Text>
      </RectButton>
    );
  };

  render() {
    return (
      <Swipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={100000}
        rightThreshold={100000}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onActivated={(event) => {
          let velocityX: number = event.nativeEvent.velocityX as number;
          if (velocityX < 0) {
            vibrate();
          }
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable from the ${direction}`);
          this.props.onSwipeableCloseCallback(
            direction,
            this.props.onSwipeableCloseCallbackProps
          );
        }}
      >
        {this.props.children}
      </Swipeable>
    );
  }
}
