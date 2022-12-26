import { AnyAction } from "redux";
import { TProfileItem } from "../../types";

const RChangeProfile = (
  state: TProfileItem = { Name: "" },
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeProfile;
