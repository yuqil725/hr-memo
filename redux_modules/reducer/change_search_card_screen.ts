import { AnyAction } from "redux";
import { ISearchCard, ISearchCardScreen } from "../../interfaces/search";

export const EMPTY_CARD: ISearchCard = {
  name: "",
  documentId: "",
  imagePath: undefined,
};

export const NEW_CARD: ISearchCard = {
  name: " ",
  documentId: " ",
  imagePath: undefined,
};

const RChangeSearchCardScreen = (
  state: ISearchCardScreen = {
    selectedCard: EMPTY_CARD,
    searchCard: [EMPTY_CARD],
    longPress: false,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_SEARCH_CARD_SCREEN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeSearchCardScreen;
