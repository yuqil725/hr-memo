import { StyleSheet } from "react-native";
import { DIMENSION_WIDTH, STAR_ACTIONS } from ".";

export const STodo = StyleSheet.create({
  todoSection: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    // paddingleft: 40,
    // paddingRight: 20,
    marginTop: 80,
    width: DIMENSION_WIDTH - 50,
    position: "relative",
  },
  switchView: {
    position: "absolute",
    right: 0,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  todoFlatList: {
    paddingTop: 30,
  },
  highlightDateView: {
    backgroundColor: STAR_ACTIONS,
    borderRadius: 10,
    padding: 10,
  },
  normalDateView: {
    padding: 10,
  },
});
