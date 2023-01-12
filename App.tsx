import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { BLACK, DARK_GRAY, PRIMARY_COLOR, WHITE } from "./assets/styles";
import { ApiAuth } from "./backend/appwrite/service/database/auth";
import TabBarIcon from "./components/TabBarIcon";
import { Constants } from "./Constants";
import store from "./redux_modules";
import { Profile, Search, Todo } from "./screens";

let apiAuth = new ApiAuth(Constants.API_ENDPOINT, Constants.P_NAMECARD_ID);

apiAuth.createSessionIfNoLogin(Constants.EMAIL, Constants.PASSWORD);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false, animationEnabled: false }}
      >
        {() => (
          <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Tab.Navigator
                tabBarOptions={{
                  showLabel: false,
                  activeTintColor: PRIMARY_COLOR,
                  inactiveTintColor: DARK_GRAY,
                  labelStyle: {
                    fontSize: 14,
                    textTransform: "uppercase",
                    paddingTop: 10,
                  },
                  style: {
                    backgroundColor: WHITE,
                    borderTopWidth: 0,
                    marginBottom: 0,
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    shadowColor: BLACK,
                    shadowOffset: { height: 0, width: 0 },
                  },
                }}
              >
                {/* <Tab.Screen
                  name="Explore"
                  component={Home}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="search"
                        text="Explore"
                      />
                    ),
                  }}
                /> */}

                <Tab.Screen
                  name="Search"
                  component={Search}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="search"
                        text="Search"
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="person"
                        text="Profile"
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Todo"
                  component={Todo}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="chatbubble"
                        text="Todo"
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            </GestureHandlerRootView>
          </Provider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

// playground
