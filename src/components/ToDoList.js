import React, {Component} from 'react'
import {getToDoList} from '../requests/request'

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
                todos: response
            })
        })

    }

    // vedere bene cosa fa il preventDefault
    // aggiungo un todo con i suoi parametri prima di tutti gli altri todo.
    addTodo(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log('form', e.target)
        this.setState({
            todo: {
                plainText: this.state.plainText,
            }
        })

        // TODO richimare il servizio di POST per aggiungere un task
        /*this.setState({
            todos: [this.state.todo, ...this.state.todos]
        })*/
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

    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function  per le promise
    render() {
        const {todos} = this.state

        return (
            <div className="App">

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
