import { AnyAction } from "redux";
import { IProfileItem } from "../../interfaces/profile";

const RChangeProfile = (
  state: IProfileItem = { display: { name: "" }, meta: { documentId: "" } },
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_DISPLAY_PROFILE":
      return {
        ...state,
        ...{ display: { ...state.display, ...action.payload } },
      };
    case "CHANGE_META_PROFILE":
      return {
        ...state,
        ...{ meta: { ...state.meta, ...action.payload } },
      };
    default:
      return state;
  }
};

export default RChangeProfile;
