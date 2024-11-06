import React, {useState} from 'react';
import './App.css';
import {tasksType, Todolist} from "./todolist/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container} from "@mui/material";
import {Grid2} from '@mui/material';
import Paper from '@mui/material/Paper'
import {MenuButton} from "./styles/MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
export type filterValuesType = 'All' | 'Active' | 'Completed'




type ThemeMode = 'dark' | 'light'

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
//theme
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme=createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#724f9c',
            },
        },

    })
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    //functions

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
    const changeTodolistName = (title: string, todolistId: string) => {
        const newTodolists = todolist.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        setTodolist(newTodolists)
        console.log("Updated todolists:", todolist); // Логирование для проверки обновлений

    }


    const changeTaskName = (title: string, todolistId: string, taskId: string) => {
        if (!todolistTasks[todolistId]) return; // Проверка на существование массива задач для указанного todolistId
        const newTodolistTasks = {
            ...todolistTasks,
            [todolistId]: todolistTasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        }
        console.log("Updated tasks:", newTodolistTasks); // Логирование для проверки обновлений

        setTodolistTasks(newTodolistTasks)
    }


    return (
        // className="App"
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                    <MenuButton color="inherit" background={theme.palette.primary.dark}>Login</MenuButton>
                    <MenuButton color="inherit">LogOut</MenuButton>
                    <MenuButton color="inherit">Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />

                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid2 container sx={{mt:'30px'}} >
                    <AddItemForm addItem={addTodolist}/>
                </Grid2>
                <Grid2 container spacing={4} sx={{mt:'30px'}}>
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
                        <Grid2>
                            <Paper sx={{p: '10px 20px 20px 20px'}}>
                        <Todolist
                            todolistId={tl.id}
                            key={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskName={changeTaskName}
                            changeTodolistName={changeTodolistName}/>
                            </Paper>
                        </Grid2>
                    )

                }

                    )}
                </Grid2>
            </Container>


                {/*<Todolist title={'List for reading'} tasks={tasks2}/>*/}
                {/*<Todolist title={'Need to fix'} tasks={tasks1} date={'12.05.2007'}/>*/}
            </ThemeProvider>
        </div>
    );
}

export default App;
