import React, { Component } from "react"
import { postToDoList } from "../requests/request"


export default class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
            todo: {
                name: null,
                plainText: ""
            }
        }
    }

    addTodo(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log('form', e.target)

        const options = {
            method: "POST",
            body: JSON.stringify({
                name: this.state.todo.name,
                plainText: this.state.todo.plainText,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        // richiamo il servizio di POST per aggiungere un task
        postToDoList(options).then(() => {
            this.setState({
                todo: {
                    plainText: ""
                }
            })
        })
    }

    //man mano che scrivo nell'input modifico il valore di plainText.
    //quando farò submit avrò già il valore pronto e settato nello state
    handleChange(e) {
        this.setState({
            todo: {
                plainText: e.target.value
            }
        })
    }

    render() {
        return (
            <>
                <form onSubmit={(e) => {
                    this.addTodo(e)
                }}
                >
                    {/*CONTROLLED se settiamo noi il valore - UNCONTROLLED se il valore viene gestito da 'html'*/}
                    <input
                        type="text"
                        value={this.state.todo.plainText}
                        onChange={(e) => {
                            this.handleChange(e)
                        }}
                        placeholder="add new element"
                    />
                    <button type="submit">Add Todo
                </button>
                </form>
            </>
        )
    }

}