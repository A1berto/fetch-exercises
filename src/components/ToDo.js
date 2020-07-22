import React from "react"

export default (props) =>{
    <div style={{display:"flex", justifyContent:"center"}}>
        <div>
            {props.todo.plainText}
        </div>
        <button onClick={propr.deleteToDo}>x</button>
    </div>

}