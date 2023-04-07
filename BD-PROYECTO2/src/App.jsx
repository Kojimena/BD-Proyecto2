import React, {useState,useEffect} from "react"
import './App.css';
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
  } from "react-router-dom";
import UserLogin from "./components/Login/UserLogin";
import UserSignIn from "./components/SignIn/SignIn"
import Account from "./components/Account/Account";
import Inventory from "./components/Inventory/Inventory";

function App() {

    const [login, setLogin] = useState('Login')
    const [currentPath, setCurrentPath] = useState("/login");

    useEffect(() => {
      const redirectPath = () => {
        switch (login) {
          case "Login":
            return "/login";
          case "SignIn":
            return "/signin";
          case "Navigation":
            return "/navigation";

          default:
            return "/";
        }
      };
  
      setCurrentPath(redirectPath());
    }, [login]);

    const logout = () => {

      // Aquí deberías hacer el logout del usuario
      setLogin('Login');
    };
    

    return(
      <Router>
        <div> 
          <Switch>
            <Route exact path="/login">
              <Login setLogin={setLogin}/>
            </Route>
            <Route exact path="/navigation">
              <Navigation />
            </Route>
            <Route exact path ="/signin">
              <SignIn  setLogin={setLogin}/>
            </Route>
            <Route path="/">
              <Redirect to={currentPath} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

function SignIn( {setLogin}) {
  console.log("Hola")
  setLogin('SignIn')
  return (
      <UserSignIn  />

  )
}

function Login({setLogin}){
    return (
      <UserLogin setLogin={setLogin}/>
    )
            
}

function Home() {
  return  <Account />
}

function About() {
  return <Inventory />
}

function Users() {
  return <h2>SEARCH RECORD</h2>;
}



function Navigation(){
  return (
    <div className="container-navigation">
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
      </div>
  )
}

export default App
