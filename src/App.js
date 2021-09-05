import "./App.css";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./List";

function App() {
  const [todos, setTodos] = useState([]);

  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // Keeping the TextField blank ONLY on start of the app

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isComplete: doc.data().isComplete,
        }))
      );
    });
  }

  function addTodo(event) {
    event.preventDefault();

    db.collection("todos").add({
      isComplete: true,
      todo: todoInput,
    });

    setTodoInput("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Ayman & Sanskar's To Do App</h1>
        <form>
          <TextField
            id="filled-basic"
            label="Write a task"
            variant="filled"
            value={todoInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(event) => setTodoInput(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Primary
          </Button>
        </form>
        
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "25px" }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              isComplete={todo.isComplete}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
