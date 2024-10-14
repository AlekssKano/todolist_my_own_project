import React from 'react';
import './App.css';
import {tasksType, Todolist} from "./todolist/Todolist";

export type filterValuesType='All'|'Active'|'Completed'


function App() {
    const [tasks1, setTasks1] = React.useState([
        {id:1, title:'Sink', isDone:true},
        {id:2, title:'Fridge', isDone:false},
        {id:3, title:'AC', isDone:true},
        {id:4, title:'Washing Machine', isDone:false},
    ]);
    const [tasks3, setTasks3] = React.useState([
        {id:1, title:'Math', isDone:true},
        {id:2, title:'English', isDone:false},
        {id:3, title:'Art', isDone:true},
        {id:4, title:'Physics', isDone:false},
        {id:5, title:'Art', isDone:true},
        {id:6, title:'Physics', isDone:false},
    ]);


    const [filter, setFilter] = React.useState<filterValuesType>('All');

    let tasksForTodolist=tasks3

    if(filter==='Active'){
        tasksForTodolist=tasks3.filter(tasks=>!tasks.isDone)
}
    if(filter==='Completed') {
        tasksForTodolist=tasks3.filter(tasks=>tasks.isDone)}

    const removeTask=( taskId:number)=>{

   const newArr = tasks3.filter(task=>task.id !== taskId)
        return setTasks3(newArr)
    }
    const changeFilter=(filter:filterValuesType)=>{
        setFilter(filter)
    }



    return (
        <div className="App">
<Todolist title={"List for learning"} tasks={tasksForTodolist} date={'08.10.2032'} removeTask={removeTask} changeFilter={changeFilter}/>
{/*<Todolist title={'List for reading'} tasks={tasks2}/>*/}
{/*<Todolist title={'Need to fix'} tasks={tasks1} date={'12.05.2007'}/>*/}
        </div>
    );
}

export default App;
