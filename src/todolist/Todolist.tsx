import React, {ChangeEvent, useRef, useState} from 'react';
import {Button} from "../components/Button";
import {filterValuesType} from "../app/App";
import {AddItemForm} from "../components/AddItemForm";
import {EditAbleSpan} from "../components/EditAbleSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiButton from '@mui/material/Button'
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {filterButtonsContainerSx, getListItemSx} from './../styles/Todolist.styles'

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
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    todolistId: string;
    changeTaskName: (name: string, todolistId: string, taskId: string) => void
    changeTodolistName: (name: string, todolistId: string) => void
}
export const Todolist = (props: TodolistTypeProps) => {
    // const inputRef = useRef<HTMLInputElement>(null)
    //
    const addTaskCallback = (title: string) => {
        props.addTask(title, props.todolistId)
    }


    //buttons_filters
    const changeFilterTaskHandler = (filter: filterValuesType) => {
        props.changeFilter(filter, props.todolistId)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const ChangeTodolistNameHandler = (name: string) => {
        props.changeTodolistName(name,props.todolistId )
    }

    return (

        <div>

            {/*<h3>{props.title}<Button title={'X'} onClick={removeTodolistHandler}/></h3>*/}
            <h3><EditAbleSpan value={props.title} onChange={ChangeTodolistNameHandler}/><Button title={'X'}
                                                                                                onClick={removeTodolistHandler}/>
            </h3>
            <AddItemForm addItem={addTaskCallback}/>

            {
                props.tasks.length === 0 ?
                    <p>No tasks</p>
                    : <List>
                        {props.tasks.map((task: tasksType) => {
                            const ChangeTaskNameHandler = (title: string) => {
                                props.changeTaskName(title, props.todolistId, task.id);
                            }
                                    return (
                                        <ListItem
                                                  key={task.id}
                                                  sx={getListItemSx(task.isDone)}
                                        >
                                            {/*<input type="checkbox" checked={task.isDone}*/}
                                            {/*       onChange={() => props.changeTaskStatus(task.id, !task.isDone, props.todolistId)}/>*/}
                                            <div>
                                            <Checkbox checked={task.isDone}
                                                      size={'small'}
                                                      onChange={() => props.changeTaskStatus(task.id, !task.isDone, props.todolistId)}/>

                                            {/*<span>{task.title}</span>*/}
                                            <EditAbleSpan value={task.title} onChange={ChangeTaskNameHandler}></EditAbleSpan>
                                            </div>
                                            {/*<Button title={'x'} onClick={() => props.removeTask(task.id, props.todolistId)}/>*/}
                                            <IconButton onClick={() => props.removeTask(task.id, props.todolistId)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItem>
                                    )})}
                            </List>
                        }

                        <Box sx={filterButtonsContainerSx} >
                            {/*<Button className={props.filter === 'All' ? "active_button_filter" : "button_filter"}*/}
                            {/*        title={'All'} onClick={() => {*/}
                            {/*    changeFilterTaskHandler('All')*/}
                            {/*}}/>*/}
                            {/*<Button className={props.filter === 'Active' ? "active_button_filter" : "button_filter"}*/}
                            {/*        title={'Active'} onClick={() => {*/}
                            {/*    changeFilterTaskHandler("Active")*/}
                            {/*}}/>*/}
                            {/*<Button className={props.filter === 'Completed' ? "active_button_filter" : "button_filter"}*/}
                            {/*        title={'Completed'} onClick={() => {*/}
                            {/*    changeFilterTaskHandler('Completed')*/}
                            {/*}}/>*/}
                            <MuiButton
                                variant={props.filter === 'All' ? 'outlined':'text'}
                                color={'inherit'}
                                onClick={() => {changeFilterTaskHandler('All')}}>
                                All
                            </MuiButton>
                            <MuiButton
                                variant={props.filter === 'Active' ? 'outlined':'text'}
                                color={'primary'}
                                onClick={() => {changeFilterTaskHandler('Active')}}>
                                Active
                            </MuiButton>
                            <MuiButton
                                variant={props.filter === 'Completed' ? 'outlined':'text'}
                                color={'secondary'}
                                onClick={() => {changeFilterTaskHandler('Completed')}}>
                                Completed
                            </MuiButton>

                        </Box>
                        {props.date}
                    </div>

                );

            };

