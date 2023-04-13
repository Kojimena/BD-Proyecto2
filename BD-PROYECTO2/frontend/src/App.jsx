import React, {useState,useEffect} from "react"
import './App.css';
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
  } from "react-router-dom";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserSignIn from "./pages/SignIn/SignIn"
import Account from "./components/Account/Account";
import Inventory from "./components/Inventory/Inventory";
import AddProduct from "./components/AddProduct/AddProduct";
import Record from "./components/Record/Record";
import AddRecord from "./components/AddRecord/AddRecord";
import BinnacleRegister from "./components/Binnacle/Binnacle";
import ResultsQuerys from "./components/Results/Results";
import ListUsers from "./components/AllUsers/AllUsers";

function App() {

    const [login, setLogin] = useState('Login')
    const [currentPath, setCurrentPath] = useState("/login");
    const history = useHistory();

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
      console.log(login)
      history.push(redirectPath());
    }, [login]);

    const logout = () => {

      // Aquí deberías hacer el logout del usuario
      setLogin('Login');
    };
    

    return(
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
  return <BinnacleRegister />
}

function Results(){
  return <ResultsQuerys />
}

function AllUsers(){
  return <ListUsers />
}


function Navigation(){
  return (
      <Router>
          <nav>
            <ul className="nav-menu">
              <li className="nav-item"> Users
                <ul className="display0">
                  <li> <Link to="/" className="nav-link">My Account</Link> </li>
                  <li> <Link to="/allusers" className="nav-link">All Users</Link> </li>
                </ul>
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
              <Route path="/allusers">
                <ListUsers />
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
