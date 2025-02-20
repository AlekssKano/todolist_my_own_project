import {v1} from "uuid";
import {TodolistType} from "../app/App";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    deleteTodolistAC,
    todolist_reducer
} from "./todolist_reducer";



test ('delete todolist', ()=>{
    let todolist1 = v1()
    let todolist2 = v1()
    let startState:TodolistType[]= [
        {id: todolist1, title: 'What to know', filter: 'All'},
        {id: todolist2, title: 'What to study', filter: 'All'},
    ]

    // const action:RemoveTodolistActionType ={
    //     type:"REMOVE_TODOLIST",
    //     payload:{
    //         id:todolist1,
    //     } // instead action we will USE removeTodolistAC!!!
    // }
  const endState =todolist_reducer(startState, deleteTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    // const action= {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         id:v1(),
    //         title: 'New Todolist',
    //     },
    // } as const

    const newID=v1()
    const endState = todolist_reducer(startState, addTodolistAC("New Todolist",newID,))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("New Todolist")
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
    //
    // const action:ChangeTodolistTitleActionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // }
    const newID=todolistId2
    const endState = todolist_reducer(startState, ChangeTodolistTitleAC(newID,'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    // const action:ChangeTodolistFilterActionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'Completed',
    //     },
    // }
    const newID=todolistId2

    const endState = todolist_reducer(startState, ChangeTodolistFilterAC(newID, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe("Completed")
})