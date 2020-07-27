import React, { useState, useEffect } from "react"
import { deleteToDoList, getToDoList } from "../requests/request"

export default function ToDo(props) {
    const [key] = useState(props.id)
    const [plainText] = useState(props.plainText)

    function deleteToDo() {
        deleteToDoList(key);
    }
    
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <li key={key}>
                {plainText}
            </li>
            <button onClick={deleteToDo}>x</button>
        </div>
    )
}