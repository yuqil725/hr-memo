import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import styles, {
  DISABLE_COLOR,
  GRAY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WHITE,
} from "../../assets/styles";
import { STodo } from "../../assets/styles/todo";
import { ApiProfileCollection } from "../../backend/appwrite/service/database/collection/profile";
import { ApiProfileBucket } from "../../backend/appwrite/service/storage/bucket/profile";
import { ProfileOneLine } from "../../components";
import { Constants } from "../../Constants";
import { ITodoItem, ITodoItems, ITodoList } from "../../interfaces/todo";
import store, { RootState } from "../../redux_modules";
import { AChangeSingleTodoItem } from "../../redux_modules/action";
import { groupBy } from "../../utils/objectUtil";

function removeTodoDate(todoStr: string) {
  return todoStr.startsWith("-") || todoStr.startsWith("[")
    ? todoStr.slice(todoStr.indexOf("]") + 2).trimStart()
    : todoStr.trimStart();
}

export function saveTodo(todoLists: ITodoList[], apiProfileCollection: any) {
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
  let grouped = groupBy(todos, (todo: any) => (todo ? todo.documentId : ""));
  Object.keys(grouped).map((k) => {
    return apiProfileCollection.updateByDocumentId(k, {
      Todo: grouped[k].map((i) => i?.todo),
    });
  });
}

export function convertTodoItemToTodoList(todoItems: ITodoItems[]) {
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

function toggleTodo(listIndex: number, itemIndex: number, todoItem: ITodoItem) {
  const newItem = {
    ...todoItem,
    disabled: todoItem.disabled ? false : true,
  };
  return store.dispatch(
    AChangeSingleTodoItem({
      listIndex: listIndex,
      itemIndex: itemIndex,
      item: newItem,
    })
  );
}

export const TodoSection = () => {
  let todoLists: ITodoList[] = useSelector(
    (state: RootState) => state.todoLists
  );
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
      <FlatList
        data={todoLists}
        keyExtractor={(item, index) => index.toString()}
        style={STodo.todoFlatList}
        renderItem={({ item: todoList, index: listIndex }) => {
          const data = todoList.item;
          const dataFiltered = todoList.item?.filter((i) => !i.disabled);
          const show =
            (dataFiltered && dataFiltered.length > 0 && !isEnabled) ||
            (isEnabled && data && data.length > 0);
          return (
            <View>
              {show ? (
                <React.Fragment>
                  <Text style={styles.title}>{todoList.date}</Text>
                  <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: todoItem, index: itemIndex }) => {
                      return todoItem.disabled && !isEnabled ? (
                        <></>
                      ) : (
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
                            const newTodoItem = toggleTodo(
                              listIndex,
                              itemIndex,
                              todoItem
                            ).payload.item;
                            let newTodoLists = [...todoLists];
                            let lastDash = 0;
                            while (
                              newTodoItem.todo &&
                              newTodoItem.todo.slice(lastDash).startsWith("-")
                            ) {
                              lastDash += 1;
                              newTodoItem.todo =
                                newTodoItem.todo.slice(lastDash);
                            }
                            if (newTodoItem.disabled) {
                              newTodoItem.todo = "-" + newTodoItem.todo;
                            }

                            newTodoLists[listIndex] = {
                              date: newTodoLists[listIndex].date,
                              item: [...newTodoLists[listIndex].item!],
                            };
                            newTodoLists[listIndex].item![itemIndex] = {
                              ...newTodoLists[listIndex].item![itemIndex],
                              ...newTodoItem,
                            };
                            console.log(newTodoItem, newTodoLists);
                            saveTodo(newTodoLists, apiProfileCollection);
                          }}
                        />
                      );
                    }}
                  />
                </React.Fragment>
              ) : undefined}
            </View>
          );
        }}
      />
    </View>
  );
};
