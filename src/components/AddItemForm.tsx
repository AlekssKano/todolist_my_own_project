import React, {ChangeEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [error, setError] = useState<string | null>(null)
    const [inputItemValue, setInputItemValue] = useState("")
    const onAddItemHandler = () => {
        if (inputItemValue.trim() !== "") {
            props.addItem(inputItemValue.trim())
            setInputItemValue("")
        } else setError("Title is Required")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputItemValue(event.currentTarget.value)
    }
    const addTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            onAddItemHandler()
        }
    }


    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={inputItemValue}
                   onChange={(event) => {
                       changeTaskTitleHandler(event)}
            }
                   onKeyUp={(event) => {
                       addTaskOnEnterHandler(event)
                   }}/>

            <Button title={'+'} onClick={() => {
                onAddItemHandler()
            }
            }/>
            {error && <div className="error_message">{error}</div>}
        </div>
    );
};


{/*<Button title={'+'} onClick={() => {*/
}
{/*    if (inputRef.current) {*/
}
{/*        props.addTask(inputRef.current.value)*/
}
{/*        inputRef.current.value="" //clean input*/
}
{/*    }*/
}
{/*}}/>*/
}