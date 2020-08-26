import React, {useState} from 'react'
import { Button } from '@material-ui/core';

export default function ListItem(props) {
    const [label, setLabel] = useState(props.plainText)

    const handleChange = (e) => {
        setLabel(e.target.value)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <li key={props.id}>
                {!props.enabled ?
                    <span> PLAIN TEXT: {props.plainText}   NAME:{props.name}   DATE:({props.creationDate}) </span>
                    : <>
                        <input type="text"
                               value={label}
                               onChange={(e) => handleChange(e)}/>
                    </>
                }


                <button onClick={!props.enabled? ()=>props.editFnc(label) : ()=>props.editFinal(label)}> {!props.enabled ? "Modify" : " Change Effectively"}</button>
                <Button onClick={!props.enabled? ()=>props.editFnc(label) : ()=>props.editFinal(label)} variant="contained" color="secondary">
                    {!props.enabled ? "Modify" : " Change Effectively"}
                </Button>

                <button onClick={props.deleteFnc}>x</button>
                <Button onClick={props.deleteFnc} variant="contained" color="primary">
                    x
                </Button>
            </li>
        </div>
    )
}
