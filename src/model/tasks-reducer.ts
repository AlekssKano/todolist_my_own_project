import {TaskTypeState} from "../app/App";
import {v1} from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType} from "./todolist_reducer";

const initialState: TaskTypeState = {};


export type DeleteTaskActionType = {
    type :'DELETE_TASK_DELETE',
    payload:{
        todolistId:string,
        taskId:string
    }
}
export type CreateTaskActionType = {
    type: 'CREATE_TASK_CREATE',
    payload:{
        todolistId:string,
        title:string
    }
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
        payload:{
        todolistId:string,
            taskId:string
            taskStatus:boolean
        }
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    payload:{
        todolistId:string,
        taskId:string
        title:string

    }
}
 type ActionType = AddTodolistActionType | RemoveTodolistActionType |DeleteTaskActionType |CreateTaskActionType|ChangeTaskStatusActionType |ChangeTaskTitleActionType
export const tasksReducer = (state: TaskTypeState = initialState, action: ActionType): TaskTypeState => {
    switch (action.type) {
        case 'ADD-TODOLIST': {

            return {...state, [action.payload.id]: []}
        }
        case 'REMOVE_TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'DELETE_TASK_DELETE': {
            const TodolistTasks = state[action.payload.todolistId]
            const newTodolistTasks = TodolistTasks.filter(task => task.id !== action.payload.taskId)
            state[action.payload.todolistId] = newTodolistTasks
            return {...state, [action.payload.todolistId]: newTodolistTasks};
        }
        case 'CREATE_TASK_CREATE': {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            }

            const TodolistTasks = state[action.payload.todolistId]
            return {...state, [action.payload.todolistId]: [newTask,...TodolistTasks]};
        }
        case 'CHANGE_TASK_STATUS': {
            const TodolistTasks = state[action.payload.todolistId]

            const newArr = TodolistTasks.map(task => (task.id == action.payload.taskId ? {...task, isDone: action.payload.taskStatus} : task))
            return  {...state, [action.payload.todolistId]: newArr};
        }
        case 'CHANGE_TASK_TITLE': {
            const TodolistTasks = state[action.payload.todolistId]

            const newArr = TodolistTasks.map(task => (task.id == action.payload.taskId ? {...task, title: action.payload.title} : task))
            return  {...state, [action.payload.todolistId]: newArr};
        }
        default:
            return state
    }
}


export const deleteTaskAC=(payload:{todolistId: string, taskId: string}):DeleteTaskActionType=>{
    return {
        type: 'DELETE_TASK_DELETE', payload} as const

}
export const createTaskAC=(payload:{todolistId:string, title:string}):CreateTaskActionType => {
    return {
        type: 'CREATE_TASK_CREATE', payload} as const

}
export const changeTaskStatusAC=(payload:{todolistId:string, taskId:string, taskStatus:boolean}):ChangeTaskStatusActionType => {
return {
    type: 'CHANGE_TASK_STATUS', payload} as const
}
export const changeTaskTitleAC =(payload:{todolistId:string, taskId:string, title:string}):ChangeTaskTitleActionType=>{
    return{
        type: 'CHANGE_TASK_TITLE', payload
    } as const
}