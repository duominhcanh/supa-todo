import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput, View } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { useAuth } from "../components/auth.context";
import { supabase } from "../core/lib/init-supabase";
import { AuthService } from "../core/services/auth-service";
import { TodoService } from "../core/services/todo-service";
import { styles } from "../theme/styles";

export default function MainScreen({ navigation }: { navigation: any }) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const todoService = new TodoService(supabase);
  const authService = new AuthService(supabase);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    todoService
      .fetchAsync()
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {});
  };

  const addTodo = (taskText: string) => {
    todoService
      .addAsync(taskText.trim(), user!.id)
      .then(() => {
        fetchTodos();
        setNewTaskText("");
      })
      .catch((err) => {});
  };

  const deleteTodo = async (id: number) => {
    await todoService.deleteAsync(id);
    fetchTodos();
  };

  const logout = async () => {
    authService.logout();
    navigation.navigate("login");
  };

  return (
    <View style={styles.screenRoot}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ ...styles.h1, flexGrow: 1 }}>Todo list</Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: "#0d9488",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            titleStyle={{ color: "#ccfbf1" }}
            title="Logout"
            onPress={() => logout()}
          />
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <View style={{ flexGrow: 1 }}>
          <Text style={{ ...styles.label, marginTop: 40 }}>New todo</Text>
          <TextInput
            style={styles.textbox}
            onChangeText={(text) => setNewTaskText(text)}
            value={newTaskText}
            placeholder="New todo here"
            autoCapitalize={"none"}
          />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: 10,
          }}
        >
          <Button
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: "#0d9488",
              paddingHorizontal: 15,
              paddingVertical: 12,
            }}
            titleStyle={{ color: "#ccfbf1" }}
            title="Add"
            onPress={() => addTodo(newTaskText)}
          />
        </View>
      </View>
      <Text style={{ ...styles.label, marginTop: 40 }}>Todos</Text>
      <SafeAreaView style={{ marginTop: 5 }}>
        <FlatList
          scrollEnabled={true}
          data={todos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item: todo }) => (
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginVertical: 10,
                },
              ]}
            >
              <Text
                style={{
                  margin: "auto",
                  fontSize: 20,
                  flexGrow: 1,
                  alignSelf: "center",
                }}
              >
                {todo.task}
              </Text>

              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Button
                  title="Delete"
                  buttonStyle={{
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                  titleStyle={{ color: "#dc2626" }}
                  onPress={() => deleteTodo(todo.id)}
                ></Button>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
