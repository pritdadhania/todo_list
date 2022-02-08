import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "./firebase_config";
import {deleteDoc,updateDoc,doc} from "firebase/firestore";
function TodoListItem({ todo, inprogress, id }) {
// function toggleInProgress() {
//     db.collection("todos").doc(id).update({
//     inprogress: !inprogress,
//     });
// }
const toggleInProgress= async () => {
    const newField={inprogress:!inprogress};
    const myDoc=doc(db,"todos",id);
    await updateDoc(myDoc,newField);
}

const deleteTodo=async () => {
    const myDoc=doc(db,"todos",id);
    await deleteDoc(myDoc);
}
// function deleteTodo() {
//     db.collection("todos").doc(id).delete();
// }

return (
    <div style={{ display: "flex" }}>
    <ListItem>
        <ListItemText
        primary={todo}
        secondary={inprogress ? "In Progress" : "Completed"}
        />
    </ListItem>

    <Button onClick={toggleInProgress}>
        {inprogress ? "Done" : "UnDone"}
    </Button>
    <Button onClick={deleteTodo}>X</Button>
    </div>
    );
}

export default TodoListItem;