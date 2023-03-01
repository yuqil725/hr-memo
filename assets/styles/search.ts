import { StyleSheet } from "react-native";
import { GRAY, WHITE } from ".";

export const SSearch = StyleSheet.create({
  centeredModel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
  },
  searchBarView: {
    flex: 1,
  },
  filterView: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  tagContainer: {
    flex: 0,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    marginTop: 19,
    marginBottom: 10,
  },
  tagView: {
    margin: 5,
    backgroundColor: GRAY,
    padding: 4,
    borderRadius: 5,
    height: 24,
  },
  tagText: {
    color: WHITE,
    fontSize: 13,
  },
});
