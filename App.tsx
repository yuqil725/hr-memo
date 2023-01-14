import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { BLACK, DARK_GRAY, PRIMARY_COLOR, WHITE } from "./assets/styles";
import { ApiAuth } from "./backend/appwrite/service/database/auth";
import TabBarIcon from "./components/TabBarIcon";
import { Constants } from "./Constants";
import store, { RootState } from "./redux_modules";
import { Login, Profile, Search, Todo } from "./screens";

const isIOS = Platform.OS == "ios";
if (isIOS) {
  let apiAuth = new ApiAuth(Constants.API_ENDPOINT, Constants.P_NAMECARD_ID);
  apiAuth.createSessionIfNoLogin(Constants.EMAIL, Constants.PASSWORD);
}

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ headerShown: false, animationEnabled: false }}
          >
            {() => {
              const session = useSelector((state: RootState) => state.session);

              return (
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
                    {!session.loggedIn && !isIOS ? (
                      <Tab.Screen
                        name="Login"
                        component={Login}
                        options={{
                          unmountOnBlur: session.loggedIn,
                          tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              iconName="chatbubble"
                              text="Login"
                            />
                          ),
                        }}
                      />
                    ) : (
                      <React.Fragment>
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
                      </React.Fragment>
                    )}
                  </Tab.Navigator>
                </GestureHandlerRootView>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppInner />
//     </Provider>
//   );
// };

export default App;

// playground
