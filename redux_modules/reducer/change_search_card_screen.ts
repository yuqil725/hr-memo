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
    case "CHANGE_SINGLE_SEARCH_CARD":
      const newSearchCard = state.searchCard.map((card: ISearchCard) => {
        if (card.documentId == action.payload.documentId) {
          return { ...card, ...action.payload };
        } else {
          return card;
        }
      });
      let newSelectedCard: ISearchCard = { ...state.selectedCard };
      if (newSelectedCard.documentId == action.payload.documentId) {
        newSelectedCard = { ...newSelectedCard, ...action.payload };
      }
      return {
        ...state,
        selectedCard: newSelectedCard,
        searchCard: newSearchCard,
      };
    default:
      return state;
  }
};

export default RChangeSearchCardScreen;
