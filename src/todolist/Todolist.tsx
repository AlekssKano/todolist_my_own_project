import React, {ChangeEvent, useRef, useState} from 'react';
import {Button} from "../components/Button";
import {filterValuesType} from "../App";

export type tasksType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TodolistTypeProps = {
    title: string
    tasks: Array<tasksType>
    date?: string
    filter: filterValuesType
    removeTask: (taskId: string, todolistId:string) => void
    changeFilter: (filter: filterValuesType, todolistId:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, taskStatus:boolean, todolistId:string) => void
    removeTodolist:( todolistId:string) => void
    todolistId:string;
}
export const Todolist = (props: TodolistTypeProps) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    //

    const [error, setError] = useState<string|null>(null)
    const [inputTasksValue, setInputTasksValue] = useState("")
    const onAddTaskHandler = () => {
        if(inputTasksValue.trim() !=="")
        {
            props.addTask(inputTasksValue.trim(),props.todolistId)
        setInputTasksValue("")
        }
        else setError("Title is Required")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTasksValue(event.currentTarget.value)
    }
    const addTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
       setError(null)
        if (event.key === 'Enter') {
            onAddTaskHandler()
        }
    }




    //buttons_filters
    const changeFilterTaskHandler= (filter: filterValuesType) =>{
        props.changeFilter(filter, props.todolistId)
    }
    const removeTodolistHandler=()=>{
        props.removeTodolist(props.todolistId)
    }
    return (

        <div>
            <h3>{props.title}<Button title={'X'} onClick={removeTodolistHandler}/></h3>
            <div>
                {/*<input ref={inputRef}/>*/}
                <input className={error?'error':''}  value={inputTasksValue} onChange={(event) => {
                    changeTaskTitleHandler(event)
                }
                }
                       onKeyUp={(event) => {
                           addTaskOnEnterHandler(event)
                       }}/>
                {/*<Button title={'+'} onClick={() => {*/}
                {/*    if (inputRef.current) {*/}
                {/*        props.addTask(inputRef.current.value)*/}
                {/*        inputRef.current.value="" //clean input*/}
                {/*    }*/}
                {/*}}/>*/}
                <Button title={'+'} onClick={() => {
                    onAddTaskHandler()
                }
                }/>
                {error&&<div className="error_message">{error}</div>}
            </div>
            {props.tasks.length > 0 ? props.tasks.map((task: tasksType) => (
                <li className={task.isDone?"is_Done":""} key={task.id}><input type="checkbox" checked={task.isDone} onChange={()=>props.changeTaskStatus(task.id, !task.isDone, props.todolistId)}/>

                    <span>{task.title}</span>
                    <Button title={'x'} onClick={() => props.removeTask(task.id, props.todolistId)}/>
                </li>
            )) : <span>No Tasks</span>}

            <div>
                <Button className={props.filter==='All'?"active_button_filter":"button_filter"} title={'All'} onClick={() => {
                    changeFilterTaskHandler('All')
                }}/>
                <Button className={props.filter==='Active'?"active_button_filter":"button_filter"} title={'Active'} onClick={() => {
                    changeFilterTaskHandler("Active")
                }}/>
                <Button className={props.filter==='Completed'?"active_button_filter":"button_filter"} title={'Completed'} onClick={() => {
                    changeFilterTaskHandler('Completed')
                }}/>

            </div>
            {props.date}
        </div>

    );

};

