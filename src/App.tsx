import React, {useState} from 'react';
import './App.css';
import {tasksType, Todolist} from "./todolist/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./components/AddItemForm";

export type filterValuesType = 'All' | 'Active' | 'Completed'

type TodolistType = {
    id: string
    title: string
    filter: filterValuesType
}

type TaskTypeState = {
    [key: string]: tasksType[]
}

function App() {
    // const [tasks1, setTasks1] = React.useState([
    //     {id: v1(), title: 'Sink', isDone: true},
    //     {id: v1(), title: 'Fridge', isDone: false},
    //     {id: v1(), title: 'AC', isDone: true},
    //     {id: v1(), title: 'Washing Machine', isDone: false},
    // ]);
    // const [tasks3, setTasks3] = React.useState([
    //     {id: v1(), title: 'Math', isDone: true},
    //     {id: v1(), title: 'English', isDone: false},
    //     {id: v1(), title: 'Art', isDone: true},
    //     {id: v1(), title: 'Physics', isDone: false},
    //     {id: v1(), title: 'Art', isDone: true},
    //     {id: v1(), title: 'Physics', isDone: false},
    // ]);
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolist, setTodolist] = React.useState<TodolistType[]>([
        {id: todolistId1, title: 'What to know', filter: 'All'},
        {id: todolistId2, title: 'What to study', filter: 'All'},
    ]);

    let [todolistTasks, setTodolistTasks] = React.useState<TaskTypeState>({
        [todolistId1]: [
            {id: v1(), title: 'Sink', isDone: true},
            {id: v1(), title: 'Fridge', isDone: false},
            {id: v1(), title: 'AC', isDone: true},
            {id: v1(), title: 'Washing Machine', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Math', isDone: true},
            {id: v1(), title: 'English', isDone: false},
            {id: v1(), title: 'Art', isDone: true},
            {id: v1(), title: 'Physics', isDone: false},
            {id: v1(), title: 'Art', isDone: true},
            {id: v1(), title: 'Physics', isDone: false},
        ]
    })


    const changeFilter = (filter: filterValuesType, todoListId: string) => {
        let newTodolist = todolist.map(el => {
            return (
                el.id === todoListId ? {...el, filter} : el
            )
        })
        setTodolist(newTodolist)
    }
    const removeTask = (taskId: string, todolistId: string) => {
        const TodolistTasks = todolistTasks[todolistId]
        const newTodolistTasks = TodolistTasks.filter(task => task.id !== taskId)
        todolistTasks[todolistId] = newTodolistTasks

        return setTodolistTasks({...todolistTasks, newTodolistTasks})
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const TodolistTasks = todolistTasks[todolistId]

        const newArr = TodolistTasks.map(task => (task.id == taskId ? {...task, isDone: taskStatus} : task))
        todolistTasks[todolistId] = newArr
        return setTodolistTasks({...todolistTasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const TodolistTasks = todolistTasks[todolistId]

        todolistTasks[todolistId] = [newTask, ...TodolistTasks];
        return setTodolistTasks({...todolistTasks})


    }
    const removeTodolist = (todolistId: string) => {
        let newTodolist = todolist.filter(t => t.id !== todolistId)
        delete todolistTasks[todolistId]
        setTodolistTasks({...todolistTasks})
        return setTodolist(newTodolist)
    }
    const addTodolist = (todolistTitle: string) => {
        const todolistId = v1()
        const newTodolist = {
            id: todolistId,
            title: todolistTitle,
            filter: 'All' as filterValuesType,
        }
        // const TodolistTasks = todolistTasks[todolistId]

        let newTodolists = [...todolist, newTodolist];
        setTodolistTasks({...todolistTasks, [todolistId]: []})
        return setTodolist(newTodolists)

    }
    const ChangeTodolistName = (title: string, todolistId: string) => {
const newTodolist =  todolist.map(t => (t.id === todolistId)?{...t,title:title}:t)
        return setTodolist(newTodolist)

    }


    const ChangeTaskName = (name: string, todolistId:string, taskId:string) => {
        const newTasklist = {
            ...todolistTasks,
            [todolistId]: todolistTasks[todolistId].map(task =>
                task.id === taskId ? { ...task, title: name } : task
            ),
        };
        return setTodolistTasks(newTasklist);
        }





    return (

        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolist.map(tl => {
                const allTodolistTasks = todolistTasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'Active') {
                    tasksForTodolist = allTodolistTasks.filter(tasks => !tasks.isDone)
                }
                if (tl.filter === 'Completed') {
                    tasksForTodolist = allTodolistTasks.filter(tasks => tasks.isDone)
                }
                return (
                    <>
                        <Todolist
                            todolistId={tl.id}
                            key={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist} date={'08.10.2032'}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskName={ChangeTaskName}
                            changeTodolistName={ChangeTodolistName}/>
                    </>
                )

            })}


            {/*<Todolist title={'List for reading'} tasks={tasks2}/>*/}
            {/*<Todolist title={'Need to fix'} tasks={tasks1} date={'12.05.2007'}/>*/}
        </div>
    );
}

export default App;
