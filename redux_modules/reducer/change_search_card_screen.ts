import { AnyAction } from "redux";
import { ISearchCardScreen } from "../../interfaces/search";

const RChangeSearchCardScreen = (
  state: ISearchCardScreen = { selectedName: "", searchCard: [{ name: "" }] },
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
