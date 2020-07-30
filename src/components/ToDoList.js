import React, {Component} from 'react'
import {deleteToDoList, getToDoList, postToDoList, editToDoList} from '../requests/request'
import {NewLabelForm} from './NewLabelForm'
import ListItem from './ListItem'

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
                plainText: '',
            }
        }
    }

    /*
    il render viene chiamato in 2 casi:
    quando cambia lo stato del componente
    se si aggiornano le props del componente padre
    */

    deleteTodo = (todoId) => {
        deleteToDoList(todoId).then(succ => {
            this.setState({
                todos: this.state.todos.filter(val => val.id !== todoId)
            })
        })
    }


    editTodo = (todoId) => {
        console.log("dentro editTodo: ", todoId)
        this.setState({
            //...this.state         lo fa in automatico
            editTodoId: todoId
        })
    }

    editFinalTodo = (id, plainText) => {
        console.log("Dentro Final editTodo: ", id, plainText)
        editToDoList(id, plainText).then(() => this.setState({
            editTodoId: ""
        }, () => {
            this.updateToDoList()
        })).catch(e => console.error("IMPOSSIBILE AGGIORNARE IL VALORE", e))

    }

    updateToDoList() {
        getToDoList().then(response => {
            this.setState({
                todos: response
            })
        }).catch(e => console.error('IMPOSSIBILE AGGIORNARE LA LISTA', e))
    }

    componentDidMount() {
        // la prima volta che viene rederizzato chiamo la lista
        this.updateToDoList()
    }

    // vedere bene cosa fa il preventDefault
    // aggiungo un _todo con i suoi parametri prima di tutti gli altri _todo.


    handleSubmit = (text) => {
        const body = {
            plainText: text,
        }
        // richiamo il servizio di POST per aggiungere un task
        postToDoList(body).then((succ) => {
            this.updateToDoList()
        }).catch(e => console.error('IMpossibile aggiungere il TODO: ', text))
    }


    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function  per le promise
    render() {
        const {todos} = this.state

        return (
            <div className="App">
                <NewLabelForm handleSubmit={this.handleSubmit}/>
                <ul>
                    {
                        todos
                            .sort((todoA, todoB) => todoB.id - todoA.id)
                            .map(todo =>
                                <ListItem
                                    key={todo.id}
                                    deleteFnc={() => this.deleteTodo(todo.id)}
                                    editFnc={() => this.editTodo(todo.id)}
                                    editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                                    enabled={todo.id === this.state.editTodoId}
                                    creationDate={todo.createdAt}
                                    plainText={todo.plainText}/>
                            )}
                </ul>
            </div>
        )
    }


}
