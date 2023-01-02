import { I18nManager, StyleSheet } from "react-native";

export const SSwipeableItem = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green",
    inset: -5,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  rightAction: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#dd2c00",
    height: "100%",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
});
