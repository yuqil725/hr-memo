import { AnyAction } from "redux";
import { IProfileScreenActivity } from "../../interfaces/profile";

const RChangeProfileScreenActivity = (
  state: IProfileScreenActivity = { friendshipDropdownOpen: false },
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_PROFILE_SCREEN_ACTIVITY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeProfileScreenActivity;
