import React from 'react'
import { Button, ListItem, ListItemText } from '@material-ui/core'
import { db } from './firebase_config'

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
            <ListItem>
                <ListItemText primary={todo} secondary={isComplete ? "Not Complete ❌❌" : "Complete ✅✅"} />
            </ListItem>

            <Button onClick={toggleIsComplete}>{isComplete ? "Done" : "Undo"}</Button>
            <Button onClick={deleteTodo}>X</Button>
        </div>
    )
}
