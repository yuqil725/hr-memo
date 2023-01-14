import { StyleSheet } from "react-native";

export const SLogin = StyleSheet.create({
  screenView: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: 200,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 20,
    margin: 10,
  },
  textInputView: {
    height: 150,
    flexShrink: 20,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  submitButton: {
    width: 50,
    fontSize: 22,
  },
});
