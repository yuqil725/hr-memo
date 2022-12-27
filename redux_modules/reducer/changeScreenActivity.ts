import { AnyAction } from "redux";
import { IScreenActivity, IProfileDisplayItem } from "../../types";

const RChangeScreenActivity = (
  state: IScreenActivity = { viewOffsetEnable: false },
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_SCREEN_ACTIVITY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeScreenActivity;
