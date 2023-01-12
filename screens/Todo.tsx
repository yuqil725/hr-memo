import React, { useEffect, useState } from "react";
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
import { Icon, ProfileOneLine } from "../components";
import { Constants } from "../Constants";
import {
  ISTodoItem,
  ITodoItem,
  ITodoItems,
  ITodoList,
} from "../interfaces/todo";
import store, { RootState } from "../redux_modules";
import { AChangeSingleTodoItem, AChangeTodo } from "../redux_modules/action";
import { groupBy, objectFilterKey, objectMapKey } from "../utils/objectUtil";

const Todo = ({ navigation }: { navigation: any }) => {
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

  let todoLists: ITodoList[] = useSelector(
    (state: RootState) => state.todoLists
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  function removeTodoDate(todoStr: string) {
    return todoStr.startsWith("-") || todoStr.startsWith("[")
      ? todoStr.slice(todoStr.indexOf("]") + 2).trimStart()
      : todoStr.trimStart();
  }

  function convertTodoItemToTodoList(todoItems: ITodoItems[]) {
    let todoLists: any = [];
    todoItems.map((i: ITodoItems) => {
      let todoList: any = {};
      if (i.todo.length > 0) {
        i.todo.map((todo: string) => {
          if (todo.length > 0) {
            let date = "Unknown";
            let disabled = false;
            if (todo.at(0) == "[") {
              const todoStart = todo.indexOf("]");
              date = todo.slice(1, todoStart);
            } else if (todo.at(0) == "-") {
              const todoStart = todo.indexOf("]");
              date = todo.slice(2, todoStart);
              disabled = true;
            }
            todoList.date = date;
            const newItem = {
              documentId: i.documentId,
              name: i.name,
              todo: todo,
              imagePath: i.imagePath ? i.imagePath.at(0) : undefined,
              disabled: disabled,
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
    todoLists = todoLists.sort((a: any, b: any) =>
      // descending
      b.date.localeCompare(a.date)
    );

    return todoLists;
  }

  function toggleTodo(
    listIndex: number,
    itemIndex: number,
    todoItem: ITodoItem
  ) {
    const newItem = {
      ...todoItem,
      disabled: todoItem.disabled ? false : true,
    };
    store.dispatch(
      AChangeSingleTodoItem({
        listIndex: listIndex,
        itemIndex: itemIndex,
        item: newItem,
      })
    );
  }

  function saveTodo() {
    const todos = todoLists
      .map((todoList: ITodoList) => {
        if (todoList.item) {
          const newTodoItem = [...todoList.item];
          return newTodoItem!.map((todoItemTmp: ITodoItem) => {
            const newTodoItem = { ...todoItemTmp };
            let lastDash = 0;
            while (
              newTodoItem.todo &&
              newTodoItem.todo.slice(lastDash).startsWith("-")
            ) {
              lastDash += 1;
              newTodoItem.todo = newTodoItem.todo.slice(lastDash);
            }
            if (newTodoItem.disabled) {
              newTodoItem.todo = "-" + newTodoItem.todo;
            }
            return {
              documentId: newTodoItem.documentId,
              todo: newTodoItem.todo,
            };
          });
        }
      })
      .flat();
    let grouped = groupBy(todos, (todo: any) => todo.documentId);
    console.log(todoLists, grouped);
    Object.keys(grouped).map((k) => {
      return apiProfileCollection.updateByDocumentId(k, {
        Todo: grouped[k].map((i) => i?.todo),
      });
    });
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
  }, [refreshing]);

  useEffect(() => {
    // call when screen lose focuse
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("called");
      // The screen is focused
      // Call any action
      saveTodo();
    });
    return unsubscribe;
  }, [navigation, todoLists]);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <FlatList
          data={todoLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: todoList, index: listIndex }) => (
            <View>
              <Text style={styles.title}>{todoList.date}</Text>
              <FlatList
                data={todoList.item}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: todoItem, index: itemIndex }) => (
                  <ProfileOneLine
                    image={
                      todoItem.imagePath
                        ? apiProfileBucket
                            .getFilePreview(todoItem.imagePath)
                            .toString()
                        : undefined
                    }
                    name={todoItem.name}
                    lastMessage={removeTodoDate(todoItem.todo)}
                    disabled={todoItem.disabled}
                    // TODO: still need to fix
                    onPress={async () => {
                      // setRefreshing(!refreshing);
                      toggleTodo(listIndex, itemIndex, todoItem);
                      // saveTodo();
                    }}
                  />
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
