import "./List.css";
import React from 'react'
import { Button, ListItem, ListItemText } from '@material-ui/core'
import { db } from './firebase_config'
import "."

export default function TodoListItem({ todo, isComplete, id }) {

    function toggleIsComplete () {
        db.collection("todos").doc(id).update({
            isComplete: !isComplete
        })
    }

    function deleteTodo() {
        db.collection("todos").doc(id).delete();
    }

    return (
        <div style={{ display: "flex" }}>
            <ListItem className="tile">
                <ListItemText primary={todo} secondary={isComplete ? "Not Complete ❌❌" : "Complete ✅✅"} />
            </ListItem>

            <Button className="button" onClick={toggleIsComplete}>{isComplete ? "Done" : "Undo"}</Button>
            <Button className="button" onClick={deleteTodo}>X</Button>
        </div>
    )
}
