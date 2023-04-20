import React, {useState,useEffect} from "react"
import './App.css';
import { StoreContext } from "storeon/react";
import store from '@store'
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
import Inventory from "./pages/Inventory/Inventory";
import AddProduct from "./pages/AddProduct/AddProduct";
import Record from "./pages/Record/Record";
import AddRecord from "./pages/AddRecord/AddRecord";
import BinnacleRegister from "./pages/Binnacle/Binnacle";
import ResultsQuerys from "./pages/Results/Results";
import ListUsers from "./pages/AllUsers/AllUsers";
import MyAccount from "./pages/MyAccount/MyAccount";
import AddPatient from "./pages/AddPatient/AddPatient";
import AllPatients from "./pages/AllPatients/AllPatients";
import AddUser from "./pages/AddUser/AddUser";

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
    

    return(
          <StoreContext.Provider value={store}>
            <Switch>
              <Route exact path="/login">
                <UserLogin setLogin={setLogin}/>
              </Route>
              <Route exact path="/navigation">
                 <Navigation login={login} />
              </Route>
              <Route exact path ="/signin">
                <SignIn  setLogin={setLogin}/>
              </Route>
              <Route path="/">
                <Redirect to={currentPath} />
              </Route>
            </Switch>
          </StoreContext.Provider>
    )
}

function SignIn( {setLogin}) {
  console.log("Hola")
  setLogin('SignIn')
  return (
      <UserSignIn setLogin={setLogin} />

  )
}

function Login({setLogin}){
    <Navigation />
    return (
      <UserLogin setLogin={setLogin}/>
    )
            
}


function Home() {
  return  <MyAccount />
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

function Addpatient(){
  return  <AddPatient />
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


function Navigation({login}){
  return (
      <Router>
      {login == 'Navigation' && <nav>
            <ul className="nav-menu">
              <li className="nav-item"> Usuarios
                <ul className="display">
                  <li> <Link to="/" className="nav-link">Mi cuenta</Link> </li>
                  <li> <Link to="/allusers" className="nav-link">Médicos</Link> </li>
                  <li> <Link to="/adduser" className="nav-link"> Añadir cuenta </Link> </li>
                </ul>
              </li>
              <li className="nav-item"> Bodega
                <ul className="display">
                  <li> <Link to="/about" className="nav-link">Search inventory</Link> </li>
                  <li><Link to="/add" className="nav-link">Añadir producto</Link></li>
                </ul>
              </li>
              <li className="nav-item"> Records
                <ul className="display">
                  <li><Link to="/users" className="nav-link">Search record</Link> </li>
                  <li><Link to="/addrecord" className="nav-link">Add record</Link></li>
                </ul>
              </li>
              <li className="nav-item"> Patients
                <ul className="display">
                  <li><Link to="/addpatient" className="nav-link">Patient</Link> </li>
                  <li><Link to="/patients" className="nav-link">Search Patient</Link></li>
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
          </nav>}
          <div className="container-navigation">
            <Switch>
              <Route path="/about">
                <Inventory />
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
              <Route path="/addpatient">
                <Addpatient />
              </Route>
              <Route path="/patients">
                <AllPatients />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/adduser">
                <AddUser />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
  )
}

export default App
