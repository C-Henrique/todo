import { useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosForUsernameApi,
} from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  const [todos, setTodos] = useState([]);

  const [message, setMessage] = useState(null);
  
  const [showAlert, setShowAlert] = useState(false);
  
  const navigate = useNavigate()
  const {username} = useAuth()

  useEffect(() => refreshTodos(), []);
  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((resp) => setTodos(resp.data))
      .catch((error) => console.error(error))
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then(() => {
          setMessage(`Todo do id ${id} removida com sucesso.`);
          setShowAlert(true)
        refreshTodos();
      })
      .catch((error) => console.error(error))
  }
  function editTodo(id) {
    navigate(`/todo/${id}`)
  }
  function closedAlert() {
    setShowAlert(false)
  }

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      <div>
        {showAlert && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={closedAlert}
            ></button>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning  btn-sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary  btn-sm"
                    onClick={() => editTodo(todo.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodosComponent;
