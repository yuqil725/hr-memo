import RChangeProfile from "./change_profile";
import RChangeProfileScreenActivity from "./change_screen_activity";
import RChangeSearchCardScreen from "./change_search_card_screen";
import RChangeSession from "./change_session";
import RChangeTodoList from "./change_todo_lists";

const Reducer = {
  profile: RChangeProfile,
  profileScreenActivity: RChangeProfileScreenActivity,
  searchCardScreen: RChangeSearchCardScreen,
  todoList: RChangeTodoList,
  session: RChangeSession,
};

export default Reducer;
