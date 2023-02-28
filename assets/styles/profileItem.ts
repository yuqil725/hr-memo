import { StyleSheet, Dimensions } from "react-native";
import { BLACK, DARK_GRAY, GRAY, PRIMARY_COLOR, WHITE } from ".";

let SProfileItem = StyleSheet.create({
  containerProfileItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: WHITE,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: DARK_GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  infoList: {
    paddingVertical: 8,
    justifyContent: "center",
    flexDirection: "row",
  },
  iconProfile: {
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoSectionView: {
    paddingTop: 8,
    justifyContent: "center",
    zIndex: -1,
  },
  infoSectionTitleView: {
    justifyContent: "flex-end",
  },
  infoSectionContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  infoSectionText: {
    color: GRAY,
    fontSize: 18,
  },
  infoContent: {
    width: "100%",
    color: DARK_GRAY,
    fontSize: 18,
  },
  addNewTagInput: {
    width: "100%",
    color: DARK_GRAY,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default SProfileItem;
