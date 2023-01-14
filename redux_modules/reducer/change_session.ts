import { AnyAction } from "redux";

const RChangeSession = (state: any = {}, action: AnyAction) => {
  switch (action.type) {
    case "CHANGE_SESSION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeSession;
