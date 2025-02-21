import {filterValuesType, TodolistType} from "../app/App";
import {createAction} from "@reduxjs/toolkit";




// export const deleteTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE_TODOLIST', payload: { id: todolistId } } as const
// }
export const removeTodolistAC =createAction<{id:string}>('todolist/REMOVE_TODOLIST')

let InitialState:TodolistType[]= []

export type RemoveTodolistActionType={
    type:'REMOVE_TODOLIST',
    payload: {
        id:string
    }
}
export type AddTodolistActionType ={
    type:'ADD-TODOLIST',
    payload: {
        id:string,
        title:string
    }
}
export type ChangeTodolistTitleActionType ={
type: 'CHANGE-TODOLIST-TITLE',
    payload: {
    id: string,
        title: string,
},
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: filterValuesType,
    },
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType |ChangeTodolistFilterActionType

export const todolist_reducer = (state:TodolistType[]=InitialState, action:ActionType) => {
    console.log("Action received:", action);  // Логируем action

    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'All' as filterValuesType,
            }
            return [...state, newTodolist];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => {
                return (
                    el.id === action.payload.id ? {...el, filter: action.payload.filter} : el
                )
            })
        }
        default:
            // throw new Error('Unknown action type')
            return state;  // Возвращаем текущее состояние вместо ошибки


    }
}

export const addTodolistAC = (title: string, id:string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { id, title } } as const
}
export const ChangeTodolistTitleAC=(id:string, title:string):ChangeTodolistTitleActionType=>{
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}
export const ChangeTodolistFilterAC=(id:string,filter:filterValuesType):ChangeTodolistFilterActionType=>{
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter} }as const

}