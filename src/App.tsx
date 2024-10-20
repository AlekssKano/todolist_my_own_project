import React, {useState} from 'react';
import './App.css';
import {tasksType, Todolist} from "./todolist/Todolist";
import {v1} from 'uuid'

export type filterValuesType='All'|'Active'|'Completed'


function App() {
    const [tasks1, setTasks1] = React.useState([
        {id:v1(), title:'Sink', isDone:true},
        {id:v1(), title:'Fridge', isDone:false},
        {id:v1(), title:'AC', isDone:true},
        {id:v1(), title:'Washing Machine', isDone:false},
    ]);
    const [tasks3, setTasks3] = React.useState([
        {id:v1(), title:'Math', isDone:true},
        {id:v1(), title:'English', isDone:false},
        {id:v1(), title:'Art', isDone:true},
        {id:v1(), title:'Physics', isDone:false},
        {id:v1(), title:'Art', isDone:true},
        {id:v1(), title:'Physics', isDone:false},
    ]);


    const [filter, setFilter] = React.useState<filterValuesType>('All');
    let tasksForTodolist=tasks3

    if(filter==='Active'){
        tasksForTodolist=tasks3.filter(tasks=>!tasks.isDone)
}
    if(filter==='Completed') {
        tasksForTodolist=tasks3.filter(tasks=>tasks.isDone)}

    const removeTask=( taskId:string)=>{

   const newArr = tasks3.filter(task=>task.id !== taskId)
        return setTasks3(newArr)
    }
    const changeTaskStatus= (taskId:string,taskStatus:boolean)=>{
        const newArr=tasks3.map(task=>(task.id==taskId?{...task, isDone:taskStatus}:task))
        setTasks3(newArr)
    }
    const addTask=(title:string)=>{

            const newArr = [...tasks3, {id: v1(), title: title, isDone: false}];
            return setTasks3(newArr)

    }
    const changeFilter=(filter:filterValuesType)=>{
        setFilter(filter)
    }



    return (
        <div className="App">
<Todolist title={"List for learning"} tasks={tasksForTodolist} date={'08.10.2032'}
          filter={filter}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}/>

{/*<Todolist title={'List for reading'} tasks={tasks2}/>*/}
{/*<Todolist title={'Need to fix'} tasks={tasks1} date={'12.05.2007'}/>*/}
        </div>
    );
}

export default App;
