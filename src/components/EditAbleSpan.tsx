import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

type EditAbleSpanType={
    value:string
    onChange:(value:string) => void
}

export const EditAbleSpan = (props:EditAbleSpanType) => {

    const [EditMode,setEditMode]=React.useState(false);
const [newValue, setNewValue] = React.useState(props.value);


    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setNewValue(event.currentTarget.value)

    }  //Modes
    const onEditMode = () => {
        setEditMode(true);
    }
    const offEditMode = () => {
        setEditMode(false);
        props.onChange(newValue)
    }

    return (

        <>{EditMode ?
            // <input value={newValue} onBlur={offEditMode} onChange={onChangeHandler}  autoFocus/>
            <TextField
                variant="outlined"
                size="small"
                value={newValue}
                onBlur={offEditMode}
                onChange={onChangeHandler}
                autoFocus
            />
            :
              <span onDoubleClick={onEditMode}>{props.value}</span>
}
</>


)
    ;
};
