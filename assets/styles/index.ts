import { StyleSheet, Dimensions } from "react-native";

export const PRIMARY_COLOR = "#5636B8";
export const SECONDARY_COLOR = "#D2EAEA";
export const DISABLE_COLOR = "#F7F3F0";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636";
export const BLACK = "#000000";

export const ONLINE_STATUS = "#46A575";
export const OFFLINE_STATUS = "#D04949";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#B644B2";
export const DISLIKE_ACTIONS = "#363636";
export const FLASH_ACTIONS = "#5028D7";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 100,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
  },
  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Text
  title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
  body: { fontSize: 22, color: DARK_GRAY },
  bodyBold: {
    fontSize: 22,
    color: DARK_GRAY,
    fontWeight: "bold",
  },

  // CONTAINER - HOME
  containerHome: {
    marginHorizontal: 10,
  },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    height: DIMENSION_HEIGHT / 2,
    width: DIMENSION_WIDTH,
  },
  topIconLeft: {
    paddingLeft: 20,
  },
  topIconRight: {
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButtonPrimary: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
  },
  roundedButtonSecondary: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    alignItems: "center",
  },
});
