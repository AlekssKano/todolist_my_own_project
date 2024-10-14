import React from 'react';
import {Button} from "../components/Button";
import {filterValuesType} from "../App";

export type tasksType={
   id: number;
    title: string;
    isDone: boolean;
}
type TodolistTypeProps={
    title:string
    tasks:Array<tasksType>
    date?:string
   removeTask: ( taskId:number)=>void
    changeFilter:(filter:filterValuesType) => void
}
export const Todolist = (props:TodolistTypeProps) => {

    const onClickHandler=()=>{

    }
    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <Button title={'+'} onClick={()=>{}}/>
                </div>
                {props.tasks.length > 0? props.tasks.map((task:tasksType) => (
                        <li key={task.id}><input type="checkbox" checked={task.isDone}/>

                            <span>{task.title}</span>
                            <Button title={'x'} onClick={()=>props.removeTask(task.id,)}/>
                        </li>
                    )) : <span>No Tasks</span>}

                <div>
                <Button title={'All'} onClick={()=>{props.changeFilter('All')}}/>
                    <Button title={'Active'} onClick={()=>{props.changeFilter('Active')}}/>
                    <Button title={'Completed'} onClick={()=>{props.changeFilter('Completed')}}/>

                </div>
                {props.date}
            </div>

    );
};

