import React, {useState} from "react";
import './App.css';
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
  } from "react-router-dom";


function App() {

    const [login, setLogin] = useState(true)

    const logged = () => {
      // Aquí deberías verificar si las credenciales del usuario son correctas
      // y establecer el estado de autenticación en consecuencia
      setLogin(true);
    };

    const logout = () => {

      // Aquí deberías hacer el logout del usuario
      setLogin(false);
    };

    const redirectPath = login ? "/navigation" : "/login";

    return(
      <Router>
        <div> 
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/navigation">
              <Navigation />
            </Route>
            <Route path="/">
              <Redirect to={redirectPath} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

function Login(){
    return <h2>Login</h2>
}

function Home() {
  return <h2>INFO USER</h2>;
}

function About() {
  return <h2>INVENTORY</h2>;
}

function Users() {
  return <h2>SEARCH RECORD</h2>;
}



function Navigation(){
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Account</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">Search inventory</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">Search record</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Log out</Link>
            </li>
          </ul>
        </nav>
  
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
