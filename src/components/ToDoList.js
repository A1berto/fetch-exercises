import React, { Component } from "react";
import { getToDoList } from "../requests/request"

/*
con le parentesi graffe mi richiamo una funzione dentro un altro file
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
                key: null,
                name: null,
                plainText: null
            }
        }
    }

    /*
    il render viene chiamato in diversi casi:
    quando cambia lo stato del componente
    se si aggiornano le props del componente padre
    */

    componentDidMount() {
        const todos = getToDoList()
            .then(json => {
                this.setState({
                    todos: json
                }, () => {
                    console.log("vedo cosa mi torna la fetch: " + todos);
                    console.log("vedo cosa mi torna lo state: " + this.state.todos);
                })

            });
    }

    //vedere bene cosa fa il preventDefault (forse non fa refreshare la pagina)
    //aggiungo un todo con i suoi parametri prima di tutti gli altri todo.
    addTodo(e) {
        e.preventDefault();
        this.setState({
            todo: {
                key: this.state.todos.length,
            }
        })
        this.setState({
            todos: [this.state.todo, ...this.state.todos]
        })
    }

    //man mano che scrivo nell'input modifico il valore di plainText.
    //quando farò submit avrò già il valore pronto e settato nello state
    handleChange(e) {
        this.setState({
            todo: {
                plainText: e.target.value
            }
        }, () => {
            console.log("Set state fatto  " + this.state.todo.plainText + this.state.todos.length);
        })
    }

    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function   per le promise
    render() {
        const { todos } = this.state;
        return (
            <div className="App">

                <form onSumbit={(e) => { this.addTodo(e) }}>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={(e) => { this.handleChange(e) }}
                        placeholder="add new element" />
                    <button onClick={(e) => { this.addTodo(e) }}>Add Todo</button>
                </form>

                <ul>
                    {todos.map(todo =>
                        <li key={todo.key}>
                            {todo.plainText}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}