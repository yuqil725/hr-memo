import RChangeProfile from "./change_profile";
import RChangeProfileScreenActivity from "./change_screen_activity";
import RChangeSearchCardScreen from "./change_search_card_screen";
import RChangeTodoItems from "./change_todo_items";
import RChangeTodoLists from "./change_todo_lists";

const Reducer = {
  profile: RChangeProfile,
  profileScreenActivity: RChangeProfileScreenActivity,
  searchCardScreen: RChangeSearchCardScreen,
  todoLists: RChangeTodoLists,
};

export default Reducer;
