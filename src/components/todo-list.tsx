import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input, ListItem, Text } from "react-native-elements";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";
import { AuthService } from "../core/services/auth-service";
import { Styles } from "../core/lib/constants";
import { supabase } from "../core/lib/init-supabase";
import { TodoService } from "../core/services/todo-service";
import { useUser } from "./user-context";

type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

export default function TodoList() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const todoService = new TodoService(supabase);
  const authService = new AuthService(supabase);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setTodos(await todoService.fetchAsync());
  };

  const addTodo = async (taskText: string) => {
    await todoService.addAsync(taskText.trim(), user!.id);

    fetchTodos();
    setNewTaskText("");
  };

  const toggleCompleted = async (id: number, isComplete: boolean) => {
    await todoService.setDoneAsync(id, !isComplete);
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await todoService.deleteAsync(id);
    fetchTodos();
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Button title="Sign out" onPress={() => authService.logout()} />
      </View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Input
          label="New todo"
          leftIcon={{ type: "font-awesome", name: "tasks" }}
          onChangeText={(text) => setNewTaskText(text)}
          value={newTaskText}
        />
        <Button title="Add" onPress={() => addTodo(newTaskText)} />
      </View>
      <SafeAreaView style={styles.verticallySpaced}>
        <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item: todo }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <View
                  style={[
                    {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <CheckBox
                    checked={todo.is_complete}
                    onPress={() => toggleCompleted(todo.id, todo.is_complete)}
                  />
                  <Text h3 style={{ margin: "auto" }}>
                    {todo.task}
                  </Text>
                  <Button
                    title="Delete"
                    onPress={() => deleteTodo(todo.id)}
                  ></Button>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
