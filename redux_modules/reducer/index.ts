import RChangeProfile from "./change_profile";
import RChangeProfileScreenActivity from "./change_screen_activity";
import RChangeSearchCardScreen from "./change_search_card_screen";
import RChangeTodo from "./change_todo";

const Reducer = {
  profile: RChangeProfile,
  profileScreenActivity: RChangeProfileScreenActivity,
  searchCardScreen: RChangeSearchCardScreen,
  todo: RChangeTodo,
};

export default Reducer;
