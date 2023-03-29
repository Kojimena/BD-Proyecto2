import React from "react";
import Navigation from "./Pages/Navigation";
import './App.css';
import { Redirect } from "react-router-dom";

function App({username}) {

    const [login, setLogin] = useState(false)

    return(
        <form load = {() => login ?  Navigation() : Login() }>
        
        </form>
    )
}

function Login(){
    return <h2>Login</h2>
}

export default App
