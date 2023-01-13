import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import styles from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import {
  convertTodoItemToTodoList,
  TodoSection,
} from "../components/todo/todoSection";
import { Constants } from "../Constants";
import { ISTodoItem, ITodoItems } from "../interfaces/todo";
import store from "../redux_modules";
import { AChangeTodo } from "../redux_modules/action";
import { objectFilterKey, objectMapKey } from "../utils/objectUtil";

const Todo = ({ navigation }: { navigation: any }) => {
  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      {TodoSection(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
          }}
        />
      )}
    </ImageBackground>
  );
};

export default Todo;
