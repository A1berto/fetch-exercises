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

    sortById = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        const app = this.state.todos.sort((todoA, todoB) => todoB.id - todoA.id)
        this.setState({
            todosById: app,
            sorted: 0
        })
    }

    sortByName = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        // FIXME la funzione di sort tra ByName e ByCharacter è simile riutilizzare il codice!
        const app = this.state.todos.sort((todoA, todoB) => todoA.name.toLowerCase() > todoB.name.toLowerCase() ? 1 : -1)
        this.setState({
            todosByName: app,
            sorted: 1
        })
    }

    sortByCreatedAt = () => {
        //TODO ordinare per createdDate
        const app = this.state.todos
        this.setState({
            todosByCreatedAt: app,
            sorted: 2
        }, () => {
            console.log(this.state.todosByCreatedAt)
        })
    }

    sortByCharcacters = () => {
        // FIXME ogni volta che chiami la funzione chiami il sort non va bene!
        const app = this.state.todos.sort((todoA, todoB) => todoA.plainText.length > todoB.plainText.length ? 1 : -1)
        this.setState({
            todosByCharcacters: app,
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
                todos: response,
            }, () => {
                this.sortById()
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

    displayToDoList = () => {
        switch (this.state.sorted) {
            case 0:
                return (this.state.todosById.map(todo =>
                    <ListItem
                        key={todo.id}
                        deleteFnc={() => this.deleteTodo(todo.id)}
                        editFnc={() => this.editTodo(todo.id)}
                        editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                        enabled={todo.id === this.state.editTodoId}
                        creationDate={todo.createdAt}
                        plainText={todo.plainText}/>))
                break;

            case 1:
                return (this.state.todosByName.map(todo =>
                    <ListItem
                        key={todo.id}
                        deleteFnc={() => this.deleteTodo(todo.id)}
                        editFnc={() => this.editTodo(todo.id)}
                        editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                        enabled={todo.id === this.state.editTodoId}
                        creationDate={todo.createdAt}
                        plainText={todo.plainText}/>))
                break;
            case 2:
                return (this.state.todosByCreatedAt.map(todo =>
                    <ListItem
                        key={todo.id}
                        deleteFnc={() => this.deleteTodo(todo.id)}
                        editFnc={() => this.editTodo(todo.id)}
                        editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                        enabled={todo.id === this.state.editTodoId}
                        creationDate={todo.createdAt}
                        plainText={todo.plainText}/>))
                break;
            case 3:
                return (this.state.todosByCharcacters.map(todo =>
                    <ListItem
                        key={todo.id}
                        deleteFnc={() => this.deleteTodo(todo.id)}
                        editFnc={() => this.editTodo(todo.id)}
                        editFinal={(plaintext) => this.editFinalTodo(todo.id, plaintext)}
                        enabled={todo.id === this.state.editTodoId}
                        creationDate={todo.createdAt}
                        plainText={todo.plainText}/>))
                break;
        }
    }


    //!!!!!!!! MAI FARE UN SET STATE ALL'INTERNO DI UN RENDER !!!!!!!!!

    //https://stackoverflow.com/questions/44574367/react-map-is-not-a-function  per le promise
    render() {

        return (
            <div className="App">
                <NewLabelForm handleSubmit={this.handleSubmit}/>

                <span>Sort by: </span>
                <form>
                    <ButtonSort
                        sortBy={() => this.sortByName()}
                        sortType="Name"
                        number="1"
                        sorted={this.state.sorted}
                    />
                    <ButtonSort
                        sortType="CreatedAt"
                        sortBy={() => this.sortByCreatedAt()}
                        number="2"
                        sorted={this.state.sorted}
                    />
                    <ButtonSort
                        sortType="Charcacters"
                        sortBy={() => this.sortByCharcacters()}
                        number="3"
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
