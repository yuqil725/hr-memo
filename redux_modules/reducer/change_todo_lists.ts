import { AnyAction } from "redux";

const RChangeTodoList = (state: any = {}, action: AnyAction) => {
  switch (action.type) {
    case "CHANGE_TODO":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default RChangeTodoList;
