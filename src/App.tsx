import React, {useReducer, useState} from 'react';
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
import {
    addTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    ChangeTodolistTitleActionType,
    removeTodolistAC,
    todolist_reducer
} from "./model/todolist_reducer";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createTaskAC,
    createTodolistAC,
    deleteTaskAC,
    deleteTodolistAC,
    tasksReducer
} from "./model/tasks-reducer";
export type filterValuesType = 'All' | 'Active' | 'Completed'




type ThemeMode = 'dark' | 'light'

export type TodolistType = {
    id: string
    title: string
    filter: filterValuesType
}

export type TaskTypeState = {
    [key: string]: tasksType[]
}

function App() {


    let [todolist, dispatchToTodolists] = useReducer(todolist_reducer,[]);

    let [todolistTasks, dispatchToTasks] = useReducer(tasksReducer, {})
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

        dispatchToTodolists(ChangeTodolistFilterAC(todoListId,filter))
    }
    const removeTask = (taskId: string, todolistId: string) => {
     dispatchToTasks(deleteTaskAC({taskId, todolistId}))
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
       dispatchToTasks(changeTaskStatusAC({taskId,taskStatus,todolistId}))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(createTaskAC({title,todolistId}))

    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(removeTodolistAC(todolistId))
        dispatchToTasks(deleteTodolistAC(todolistId))
    }

    const addTodolist = (todolistTitle: string) => {
        let todolistId=v1()
    dispatchToTodolists(addTodolistAC(todolistTitle, todolistId))
        dispatchToTasks(createTodolistAC(todolistId))

    }
    const changeTodolistName = (title: string, todolistId: string) => {
      dispatchToTodolists(ChangeTodolistTitleAC(todolistId,title))
    }


    const changeTaskName = (title: string, todolistId: string, taskId: string) => {
        dispatchToTasks(changeTaskTitleAC({title, todolistId, taskId}))
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
