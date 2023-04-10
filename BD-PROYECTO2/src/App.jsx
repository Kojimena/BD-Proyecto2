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
import AddProduct from "./components/AddProduct/AddProduct";
import Record from "./components/Record/Record";
import AddRecord from "./components/AddRecord/AddRecord";

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
  return <Record />
}

function Add() {
  return <AddProduct />
}

function Addrecord(){
  return  <AddRecord />
}

function Binnacle(){
  return <h2>BINNACLE</h2>
}

function Results(){
  return <h2>RESULTS</h2>
}




function Navigation(){
  return (
      <Router>
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Account</Link>
              </li>
              <li className="nav-item"> Products 
                <ul className="display1">
                  <li> <Link to="/about" className="nav-link">Search inventory</Link> </li>
                  <li><Link to="/add" className="nav-link">Add product</Link></li>
                </ul>
              </li>
              <li className="nav-item"> Records
                <ul className="display2">
                  <li><Link to="/users" className="nav-link">Search record</Link> </li>
                  <li><Link to="/addrecord" className="nav-link">Add record</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/binnacle" className="nav-link">Binnacle</Link>
              </li>
              <li className="nav-item">
                <Link to="/results" className="nav-link">Results</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Log out</Link>
              </li>
            </ul>
          </nav>
          <div className="container-navigation">
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/add">
                <Add />
              </Route>
              <Route path="/addrecord">
                <Addrecord />
              </Route>
              <Route path="/binnacle">
                <Binnacle />
              </Route>
              <Route path="/results">
                <Results />
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
