import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNameHelloWordApi } from "./api/HelloWordApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();
  const {token} = useAuth();
  const [msg, setMsg] = useState(null);

  function callHWApi() {
    getNameHelloWordApi(username, token)
      .then((msg) => msgSuccess(msg))
      .catch((err) => console.error(err))
      .finally(console.log("finish"));
  }
  function msgSuccess({ data }) {
    setMsg(data.message);
  }
  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHWApi}>
          Call Hello World
        </button>
      </div>
      {msg != null ? (

      <div className="alert alert-secondary" role="alert">
        {msg}
      </div>
      ) : ''}
    </div>
  );
}

export default WelcomeComponent;
