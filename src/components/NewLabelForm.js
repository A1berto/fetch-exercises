import React, {Component, useState} from 'react'
import {postToDoList} from '../requests/request'


/*
    props {
      handleSubmit (text) => void
    }
 */
export const NewLabelForm = props => {

    const [label, setLabel] = useState('')

    const addTodo = (e) => {
        e.preventDefault()
        e.stopPropagation()
        props.handleSubmit(label)
        setLabel('')
    }

    //man mano che scrivo nell'input modifico il valore di plainText.
    //quando farò submit avrò già il valore pronto e settato nello state
    const handleChange = (e) => {
        setLabel(e.target.value)
        /*this.setState({
            todo: {
                plainText: e.target.value
            }
        })*/
    }

    return (
        <>
            <form onSubmit={(e) => addTodo(e)}
            >
                {/*CONTROLLED se settiamo noi il valore - UNCONTROLLED se il valore viene gestito da 'html'*/}
                <input
                    type="text"
                    value={label}
                    onChange={(e) => handleChange(e)}
                    placeholder="add new element"
                />
                <button type="submit">Add</button>
            </form>
        </>
    )
}
