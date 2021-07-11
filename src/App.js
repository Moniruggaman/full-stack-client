import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header/Header';
import Home from './Home/Home';
import PrivateRoute from './Login/PrivateRoute';
import Order from './Order/Order';
import Login from './Login/Login';
import AddProducts from './Admin/AddProducts';
import Inventory from './Admin/Inventory';
import CheckOut from './Order/CheckOut';
import Admin from './Admin/Admin';
import OrderDetail from './Order/OrderDetail';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (

    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
    <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/addProducts">
          <AddProducts></AddProducts>
        </Route>
        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/order/:_id">
          <Order></Order>
        </PrivateRoute> 
        <PrivateRoute path="/admin">
          <Admin></Admin>
        </PrivateRoute> 
        <Route path="/check/:check_id">
          <CheckOut></CheckOut>
        </Route>
        <Route path="/ordered">
          <OrderDetail></OrderDetail>
        </Route>

      </Switch>
  </Router>
  </UserContext.Provider>
);
}

export default App;
