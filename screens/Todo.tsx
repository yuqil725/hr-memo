import { useAppState } from "@react-native-community/hooks";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import styles from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import {
  convertTodoItemToTodoList,
  saveTodo,
  TodoSection,
} from "../components/todo/todoSection";
import { Constants } from "../Constants";
import { ISTodoItem, ITodoItems, ITodoList } from "../interfaces/todo";
import store, { RootState } from "../redux_modules";
import { AChangeTodo } from "../redux_modules/action";
import { objectFilterKey, objectMapKey } from "../utils/objectUtil";

const Todo = ({ navigation }: { navigation: any }) => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  let todoLists: ITodoList[] = useSelector(
    (state: RootState) => state.todoLists
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const appState = useAppState();

  useEffect(() => {
    let promise = apiProfileCollection.listDocument();
    promise.then(
      function (response: any) {
        let newTodoItems: ITodoItems[] = response.documents.map(
          (e: ITodoItems) => {
            return objectMapKey(objectFilterKey(e, ISTodoItem), ISTodoItem);
          }
        );
        store.dispatch(AChangeTodo(convertTodoItemToTodoList(newTodoItems)));
      },
      function (error: any) {
        console.error(error);
      }
    );
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    // call when screen lose focuse
    const unsubscribe = navigation.addListener("blur", () => {
      // The screen is focused
      // Call any action
      saveTodo(todoLists, apiProfileCollection);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (appState !== "active") {
      saveTodo(todoLists, apiProfileCollection);
    }
  }, [appState]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
          }}
        />
      }
    >
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.bg}
      >
        {TodoSection()}
      </ImageBackground>
    </ScrollView>
  );
};

export default Todo;
