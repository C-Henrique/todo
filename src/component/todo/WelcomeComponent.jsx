import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function WelcomeComponent() {

    const { username } = useParams()

    function callHWApi(){
        axios.get('http://localhost:8080/hello-world').then( msg => console.log(msg)).catch(err => console.error(err)).finally(console.log('finish'))
    }
    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHWApi}>Call Hello World</button>
            </div>
        </div>
    )
}

export default WelcomeComponent