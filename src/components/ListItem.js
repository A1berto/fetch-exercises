import React, {useState} from 'react'


export default function ListItem(props) {
    const [label, setLabel] = useState(props.plainText)

    const handleChange = (e) => {
        setLabel(e.target.value)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {/*MOSTRARE ANCHE IL NOME DI CHI HA CREATO IL TODO*/}
            <li key={props.id}>
                {!props.enabled ?
                    <span> {props.plainText} ({props.creationDate}) </span>
                    : <>
                        <input type="text"
                               value={label}
                               onChange={(e) => handleChange(e)}/>
                    </>
                }


                <button onClick={!props.enabled? ()=>props.editFnc(label) : ()=>props.editFinal(label)}> {!props.enabled ? "Modify" : " Change Effectively"}</button>
                <button onClick={props.deleteFnc}>x</button>
            </li>
        </div>
    )
}
