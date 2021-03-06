import React, {Component} from 'react'
import {deleteToDoList, getToDoList, postToDoList, editToDoList} from '../requests/request'
import {NewLabelForm} from './NewLabelForm'
import ListItem from './ListItem'
import ButtonSort from '../components/ButtonSort'

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
            todosById: [],
            todosByName: [],
            todosByCreatedAt: [],
            todosByCharcacters: [],
            sorted: 0,
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

    componentDidMount() {
        // la prima volta che viene rederizzato chiamo la lista
        this.updateToDoList()
    }

    sortById = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        this.setState({
            sorted: 0
        })
    }

    sortByName = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        // FIXME la funzione di sort tra ByName e ByCharacter è simile riutilizzare il codice!
        this.setState({
            sorted: 1
        })
    }

    sortByCreatedAt = () => {
        //TODO ordinare per createdDate
        this.setState({
            sorted: 2
        })
    }

    sortByCharcacters = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        this.setState({
            sorted: 3
        })
    }

    deleteTodo = (todoId) => {
        deleteToDoList(todoId).then(succ => {
            this.setState({
                todos: this.state.todos.filter(val => val.id !== todoId)
            })
        })
    }

    editTodo = (todoId) => {
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
            console.log("Response: ", response)
            this.setState({
                todos: response,
            }, () => {
                console.log("TODOS: ", this.state.todos)

                //CHIEDERE (rompo la reference.  //TODO)
                //TODO


                const appID = [...this.state.todos].sort((todoA, todoB) => {
                    return Number(todoB.id) < Number(todoA.id) ? 1 : -1
                })

                const appNAME = [...this.state.todos].sort((todoA, todoB) => todoA.name.toLowerCase() > todoB.name.toLowerCase() ? 1 : -1)
                const appCreatedAt = [...this.state.todos].sort((todoA, todoB) =>
                    new Date(todoA.createdAt).getTime() < new Date(todoB.createdAt).getTime() ? 1 : -1
                )
                const appCHARACTERS = [...this.state.todos].sort((todoA, todoB) => todoA.plainText.length > todoB.plainText.length ? 1 : -1)
                console.log("AppName:  ", appNAME)
                console.log("AppChara:  ", appCHARACTERS)
                console.log("AppCreatedAt:  ", appCreatedAt)


                this.setState({
                    todosById: appID,
                    todosByName: appNAME,
                    todosByCreatedAt: appCreatedAt,
                    todosByCharcacters: appCHARACTERS
                }, () => {
                    console.log("Il mio state: ", this.state)
                })
            })
        }).catch(e => console.error('IMPOSSIBILE AGGIORNARE LA LISTA', e))
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

    displayListItem = (array) => {
        return array.map(todo =>
            <ListItem
                key={todo.id}
                deleteFnc={() => this.deleteTodo(todo.id)}
                editFnc={() => this.editTodo(todo.id)}
                editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                enabled={todo.id === this.state.editTodoId}
                creationDate={todo.createdAt}
                plainText={todo.plainText}
                name={todo.name}/>)
    }
    displayToDoList = () => {
        switch (this.state.sorted) {
            case 0:
                return this.displayListItem(this.state.todosById)
            case 1:
                return this.displayListItem(this.state.todosByName)
            case 2:
                return this.displayListItem(this.state.todosByCreatedAt)
            case 3:
                return this.displayListItem(this.state.todosByCharcacters)
        }
    }

    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!
    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function  per le promise
    render() {
        return (
            <div className="App">
                <NewLabelForm handleSubmit={this.handleSubmit}/>
                <form>
                    <ButtonSort
                        sortType="Name"
                        sortBy={() => this.sortByName()}
                        number={1}
                        sorted={this.state.sorted}
                    />
                    <ButtonSort
                        sortType="CreatedAt"
                        sortBy={() => this.sortByCreatedAt()}
                        number={2}
                        sorted={this.state.sorted}
                    />
                    <ButtonSort
                        sortType="Charcacters"
                        sortBy={() => this.sortByCharcacters()}
                        number={3}
                        sorted={this.state.sorted}
                    />
                </form>

                <ul>
                    {
                        this.displayToDoList()
                    }
                    {console.log(this.state.sorted + "  è il sorted")}
                </ul>
            </div>
        )
    }
}
