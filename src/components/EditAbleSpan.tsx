import React, {ChangeEvent} from 'react';

type EditAbleSpanType={
    value:string
    onChange:(value:string) => void
}

export const EditAbleSpan = (props:EditAbleSpanType) => {

    const [EditMode,setEditMode]=React.useState(false);
const [NewValue, setNewValue] = React.useState(props.value);
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setNewValue(event.currentTarget.value)
    }  //Modes
    const onEditMode = () => {
        setEditMode(true);
    }
    const offEditMode = () => {
        setEditMode(false);
        props.onChange(NewValue)
    }

    return (

        <>{EditMode ? (
            <input value={NewValue} onBlur={offEditMode} onChange={onChangeHandler}  autoFocus/>
            ):
              <span onDoubleClick={onEditMode}>{props.value}</span>
}
</>


)
    ;
};
