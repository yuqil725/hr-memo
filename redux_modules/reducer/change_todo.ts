import { AnyAction } from "redux";
import { ITodoList } from "../../interfaces/todo";

const UNKNOWN_DATE = "Unknown";

const RChangeTodo = (
  state: ITodoList[] = [{ date: UNKNOWN_DATE }],
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_TODO":
      return action.payload;
    default:
      return state;
  }
};

export default RChangeTodo;
