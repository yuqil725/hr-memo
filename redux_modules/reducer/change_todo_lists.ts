import { AnyAction } from "redux";
import { ITodoList } from "../../interfaces/todo";

const UNKNOWN_DATE = "Unknown";

const RChangeTodoLists = (
  state: ITodoList[] = [{ date: UNKNOWN_DATE }],
  action: AnyAction
) => {
  switch (action.type) {
    case "CHANGE_TODO":
      return action.payload;
    case "CHANGE_SINGLE_TODO_ITEM":
      let newState = [...state];
      if (newState[action.payload.listIndex].item) {
        newState[action.payload.listIndex] = {
          date: newState[action.payload.listIndex].date,
          item: [...newState[action.payload.listIndex].item!],
        };
        newState[action.payload.listIndex].item![action.payload.itemIndex] = {
          ...newState[action.payload.listIndex].item![action.payload.itemIndex],
          ...action.payload.item,
        };
      } else {
        newState[action.payload.listIndex].item = [
          {
            ...action.payload.item,
          },
        ];
      }
      return newState;
    default:
      return state;
  }
};

export default RChangeTodoLists;
