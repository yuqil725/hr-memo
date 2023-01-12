import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import DEMO from "../assets/data/demo";
import styles, { DARK_GRAY } from "../assets/styles";
import { ApiProfileCollection } from "../backend/appwrite/service/database/collection/profile";
import { ApiProfileBucket } from "../backend/appwrite/service/storage/bucket/profile";
import { Icon, Message } from "../components";
import { Constants } from "../Constants";
import {
  ISTodoItem,
  ITodoItem,
  ITodoItems,
  ITodoList,
} from "../interfaces/todo";
import store, { RootState } from "../redux_modules";
import { AChangeTodo } from "../redux_modules/action";
import { objectFilterKey, objectMapKey } from "../utils/objectUtil";

const Todo = () => {
  let apiProfileBucket = new ApiProfileBucket(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.BKT_NAMECARD_ID
  );

  let apiProfileCollection = new ApiProfileCollection(
    Constants.API_ENDPOINT,
    Constants.P_NAMECARD_ID,
    Constants.DB_NAMECARD_ID,
    Constants.C_PROFILE_ID
  );

  function convertTodoItemToTodoList(todoItems: ITodoItems[]) {
    let todoLists: any = [];
    todoItems.map((i: ITodoItems) => {
      let todoList: any = {};
      if (i.todo.length > 0) {
        i.todo.map((todo: string) => {
          if (todo.length > 0) {
            let date = "Unknown";
            if (todo.at(0) == "[") {
              date = todo.slice(1, todo.indexOf("]"));
            }
            todoList.date = date;
            const newItem = {
              name: i.name,
              todo: todo,
              imagePath: i.imagePath ? i.imagePath.at(0) : undefined,
            };
            if (!todoList.item || todoList.item.length == 0) {
              todoList.item = [newItem];
            } else {
              todoList.item.push(newItem);
            }
          }
        });
        if (Object.keys(todoList).length == 2) {
          todoLists.push(todoList);
        }
      }
    });
    return todoLists;
  }

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
  }, []);

  let todoLists: ITodoList[] = useSelector((state: RootState) => state.todo);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <FlatList
          data={todoLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: todoList }) => (
            <View>
              <Text style={styles.title}>{todoList.date}</Text>
              <FlatList
                data={todoList.item}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: todoItem }) => (
                  <TouchableOpacity>
                    <Message
                      image={
                        todoItem.imagePath
                          ? apiProfileBucket
                              .getFilePreview(todoItem.imagePath)
                              .toString()
                          : undefined
                      }
                      name={todoItem.name}
                      lastMessage={todoItem.todo}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Todo;
