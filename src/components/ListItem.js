import React, {useState, useEffect} from 'react'
import {deleteToDoList, getToDoList} from '../requests/request'


// deleteFnc(e)

export default function ListItem(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <li key={props.id}>
                {props.plainText} ({props.creationDate})
                <button onClick={props.deleteFnc}>x</button>
            </li>
        </div>
    )
}
