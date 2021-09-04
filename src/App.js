import './App.css';
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { db } from './firebase_config';
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);

  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []) // Keeping the TextFiled blank ONLY on start of the app

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isComplete:doc.data().isComplete
        }))
      );
    })
  }

  function addTodo (e) {
    e.preventDefault();

    db.collection("todos").add({
      isComplete: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");

  }

  return (
    <div className="App" style={{}}>
      <h1>Sanskar & Ayman's To Do App</h1>
      <form>
      <TextField 
        id = "filled-basic" 
        label = "Write a task"
        variant = "filled"
        value = {todoInput} 
        onChange = {(e) => setTodoInput(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" disableElevation onClick={addTodo}>
        Primary
      </Button></form>
    </div>
  );
}

export default App;
