import React, { MutableRefObject, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import styles, {
  DISABLE_COLOR,
  GRAY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  STAR_ACTIONS,
  WHITE,
} from "../../assets/styles";
import { STodo } from "../../assets/styles/todo";
import { ApiProfileCollection } from "../../backend/appwrite/service/database/collection/profile";
import { ApiProfileBucket } from "../../backend/appwrite/service/storage/bucket/profile";
import { ProfileOneLine } from "../../components";
import { Constants } from "../../Constants";
import { ISProfileDisplayItem } from "../../interfaces/profile";
import { ITodoItem, ITodoItems } from "../../interfaces/todo";
import store, { RootState } from "../../redux_modules";
import { AChangeTodo } from "../../redux_modules/action";
import { TsToStr } from "../../utils/dateUtil";
import { objectFilterKey, objectMapKey } from "../../utils/objectUtil";

function removeTodoDate(todoStr: string) {
  return todoStr.startsWith("-") || todoStr.startsWith("[")
    ? todoStr.slice(todoStr.indexOf("]") + 2).trimStart()
    : todoStr.trimStart();
}

function updateTodo(todo: string, disabled: boolean) {
  let lastDash = 0;
  while (todo && todo.slice(lastDash).startsWith("-")) {
    lastDash += 1;
    todo = todo.slice(lastDash);
  }
  if (disabled) {
    todo = "-" + todo;
  }
  return todo;
}

export function convertTodoItemToTodoList(todoItems: ITodoItems[]) {
  let todoList: any = {};
  todoItems.map((i: ITodoItems) => {
    if (i.todo && i.todo.length > 0) {
      i.todo.map((todo: string) => {
        if (todo && todo.length > 0) {
          let date = "Unknown";
          let disabled = false;
          if (todo.at(0) == "[") {
            const todoStart = todo.indexOf("]");
            date = todo.slice(1, todoStart);
          } else if (todo.at(0) == "-") {
            if (todo.at(1) == "[") {
              const todoStart = todo.indexOf("]");
              date = todo.slice(2, todoStart);
            }
            disabled = true;
          }
          const newItem = {
            documentId: i.documentId,
            name: i.name,
            todo: todo,
            imagePath: i.imagePath ? i.imagePath.at(0) : undefined,
            disabled: disabled,
          };
          if (!todoList[date] || todoList[date].length == 0) {
            todoList[date] = [newItem];
          } else {
            todoList[date].push(newItem);
          }
        }
      });
    }
  });
  const orderedTodoList = Object.keys(todoList)
    .sort((a, b) => b.localeCompare(a))
    .reduce((obj: any, key: any) => {
      obj[key] = todoList[key];
      return obj;
    }, {});

  return orderedTodoList;
}

function toggleTodo(
  date: string,
  todoItem: ITodoItem[],
  index: number,
  apiProfileCollection: any
) {
  const newItem = todoItem.map((item, idx) => {
    if (idx == index) {
      let itemTmp = { ...item };
      itemTmp.disabled = itemTmp.disabled ? false : true;
      return itemTmp;
    }
    return { ...item };
  });

  store.dispatch(
    AChangeTodo({
      [date]: newItem,
    })
  );

  //   save this change to profile
  let promise = apiProfileCollection.queryByDocumentId(
    todoItem[index].documentId
  );
  promise.then(
    function (response: any) {
      let newDisplayState: any = objectMapKey(
        objectFilterKey(response.documents[0], ISProfileDisplayItem),
        ISProfileDisplayItem
      );
      const newTodo = newDisplayState.todo.map((todoStr: string) => {
        if (todoItem[index].todo == todoStr) {
          return updateTodo(todoItem[index].todo, !todoItem[index].disabled);
        }
        return todoStr;
      });
      apiProfileCollection.updateByDocumentId(todoItem[index].documentId, {
        Todo: newTodo,
      });
    },
    function (error: any) {
      console.error(error);
    }
  );
}

export const TodoSection = (refreshControl: any) => {
  let todoList: any = useSelector((state: RootState) => state.todoList);
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

  const todayStr = TsToStr(Date.now()).slice(1, -1);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [todayY, setTodayY] = useState(0);

  const scrollRef: MutableRefObject<ScrollView | null> = useRef(null);

  return (
    <View style={STodo.todoSection}>
      <View style={STodo.switchView}>
        <Text style={styles.bodyBold}>Show All </Text>
        <Switch
          trackColor={{ false: SECONDARY_COLOR, true: PRIMARY_COLOR }}
          thumbColor={isEnabled ? WHITE : DISABLE_COLOR}
          ios_backgroundColor={GRAY}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={STodo.todoFlatList}
          ref={scrollRef}
          refreshControl={refreshControl}
        >
          {Object.keys(todoList).map((k, index) => {
            return (
              <TouchableOpacity
                key={index}
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  if (k == todayStr) {
                    setTodayY(layout.y);
                    scrollRef.current!.scrollTo({
                      y: layout.y,
                      animated: true,
                    });
                  }
                }}
              >
                <View
                  style={
                    todayStr == k
                      ? STodo.highlightDateView
                      : STodo.normalDateView
                  }
                >
                  <View>
                    <Text style={styles.title}>{k}</Text>
                  </View>

                  {todoList[k].map((v: ITodoItem, index: number) => {
                    return isEnabled || (!isEnabled && !v.disabled) ? (
                      <ProfileOneLine
                        key={index}
                        image={
                          v.imagePath
                            ? apiProfileBucket
                                .getFilePreview(v.imagePath)
                                .toString()
                            : undefined
                        }
                        name={v.name}
                        lastMessage={removeTodoDate(v.todo)}
                        disabled={v.disabled}
                        onPress={() => {
                          toggleTodo(
                            k,
                            todoList[k],
                            index,
                            apiProfileCollection
                          );
                        }}
                      />
                    ) : undefined;
                  })}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
