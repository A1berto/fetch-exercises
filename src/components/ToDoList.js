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
                    console.log("ho finito la callback del setState");
                    console.log("vedo cosa mi torna la fetch: " + todos);
                    console.log("vedo cosa mi torna lo state: " + this.state.todos);
                })

            });
    }

    //MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER!!!!!!!!!!!!!!!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function   per le promise
    render() {
        const { todos } = this.state;
        return (
            <div className="App">
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


/*
<ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  {" "}
                  Name: {todo.name} | PlainText: {todo.plainText}
                </li>
              ))}
            </ul>
*/