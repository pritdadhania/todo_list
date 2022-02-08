import './App.css';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
// import firebase from "firebase/app";
// import {FieldValue} from 'firebase/firestore/lite';
import { collection,addDoc,getDocs} from "firebase/firestore";
import TodoListItem from "./todo";


function App() {

  const [todoInput, setTodoInput] = useState("");
  const [todos,setTODOs]=useState([]);
  const userRef=collection(db,"todos");
  const addTodo= async ()=>{
    await addDoc(collection(db, "todos"),
    { 
      inprogress: true,
      timestamp:new Date(),
      todo: todoInput
    });
  }
  
  useEffect(() => {
    const getTODO= async () => {
      let dat= await getDocs(userRef);
      setTODOs(dat.docs.map((doc) => ({...doc.data(),id: doc.id})));
    }
    getTODO();
  },[userRef]); 
  return (
    <div 
      className="App" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        }}
      >
      <div>
      <header className="App-header"> 
        <h1>My TODO List...📃🖋</h1>
      <TextField 
        id="standard-basic" 
        label="Write a TODO" 
        value={todoInput}
        variant="standard" 
        style={{maxWidth:"300px",width:"90vw"}}
        onChange={(e) => setTodoInput(e.target.value) }
        />
        
        <Button 
        // variant="outlined" 
        variant="contained" 
        onClick={addTodo}
        // style={{ display: "none" }}
        
        
        >
          add TODO task
          </Button>
          
        {
          todos.map((todo) => {
            return (
              <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id} />
            );
            
              /* return (
              <div>
                {" "}
                
                <h3>in Progress: {todo.inprogress.toString()}</h3>
                <h3>Timestamp: {todo.timestamp.toString()}</h3>
                <h3>todo: {todo.todo}</h3>
                <br></br>
              </div>
            ); */
          })
        }
      </header>
    </div>
    </div>
  );
}

export default App;