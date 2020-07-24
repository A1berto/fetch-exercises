import React, { Component } from 'react'
import { getToDoList } from '../requests/request'
import ToDoForm from "../components/ToDoForm"

/*
IMPORT: con le parentesi graffe mi richiamo una funzione dentro un altro file
senza queste mi richiamo la classe intera.
Dunque se ho un export default ---> senza parentesi
se ho un export ---> con parentesi (in genere)
*/

export default class ToDoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todo: {
                name: null,
                plainText: ''
            }
        }
    }

    /*
    il render viene chiamato in 2 casi:
    quando cambia lo stato del componente
    se si aggiornano le props del componente padre
    */

    componentDidMount() {
        getToDoList().then(response => {
            this.setState({
                todos: response.sort()
            })
        })
    }

    componentDidUpdate(){
        getToDoList().then(response => {
            this.setState({
                todos: response
            })
        })
    }

    // vedere bene cosa fa il preventDefault
    // aggiungo un todo con i suoi parametri prima di tutti gli altri todo.



    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function  per le promise
    render() {
        const { todos } = this.state

        return (
            <div className="App">
                <ToDoForm todos={this.state.todos} />
                <ul>
                    {
                        todos.map(todo =>
                            <li key={todo.key}>
                                {todo.plainText}
                            </li>
                        )}
                </ul>

            </div>

        )
    }
}
