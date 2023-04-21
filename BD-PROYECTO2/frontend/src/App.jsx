import React, {useState,useEffect} from "react"
import './App.css';
import { StoreContext, useStoreon  } from "storeon/react";
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
import LogOut from "./pages/LogOut/LogOut"


function App() {

    return(
          <StoreContext.Provider value={store}>
            <Switch>
              <Route exact path="/login">
                <UserLogin />
              </Route>
              <Route exact path="/">
                 <Navigation />
              </Route>
              <Route exact path ="/signin">
                <SignIn />
              </Route>
            </Switch>
          </StoreContext.Provider>
    )
}

function SignIn() {
  return (
      <UserSignIn />
  )
}

function Login(){
    return (
      <UserLogin/>
    )
            
}



function Navigation(){

  const history = useHistory()


  const {user} = useStoreon('user')

  if (user.dpi == ''){
    console.log ('No hay usuario')
    history.push('/login')
    return null 
  }
    console.log('Hay usuario')
  
  return (
      <Router>
        <nav>
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
                <Link to="/logout" className="nav-link">Log out</Link>
              </li>
            </ul>
          </nav>
          <div className="container-navigation">
            <Switch>
              <Route path="/about">
                <Inventory />
              </Route>
              <Route path="/users">
                <Record />
              </Route>
              <Route path="/allusers">
                <ListUsers />
              </Route>
              <Route path="/add">
                <AddProduct />
              </Route>
              <Route path="/addrecord">
                <AddRecord />
              </Route>
              <Route path="/binnacle">
                <BinnacleRegister />
              </Route>
              <Route path="/results">
                <ResultsQuerys />
              </Route>
              <Route path="/addpatient">
                <AddPatient />
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
              <Route path="/logout">
                <LogOut />
              </Route>
              <Route path="/">
                <MyAccount />
              </Route>
            </Switch>
          </div>
        </Router>
  
  )
  
}

export default App
