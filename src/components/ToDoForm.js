import React, { Component } from "react"

export default class ToDoForm extends Component {
    state = {
        text=""
    }

    //questa funzione richiama l'on submit presente in ToDoList e gli passa dei parametri
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            key: props.todos.length,
            plainText: this.state.text
        })
        this.setState({
            text:""
        })
    }
    
    handleChange = () => {

    }

    render() {
        return (
            <form onSumbit={this.handleSubmit}>
                <input
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    placeholder="add new element" />
                <button onClick={this.handleSubmit}>Add Todo</button>
            </form>
        )
    }

}