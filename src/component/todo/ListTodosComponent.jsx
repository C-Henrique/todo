import { useEffect, useState } from "react"
import { retrieveAllTodosForUsername } from "./api/TodosApiService"

function ListTodosComponent() {

    const today = new Date()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])
    useEffect(
        () => refreshTodos(), []
    )
    function refreshTodos() {

        retrieveAllTodosForUsername('in28minutes').then( resp => setTodos(resp.data)).catch(error => console.error(error)).finally(console.log('finish'))
    }



    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ListTodosComponent