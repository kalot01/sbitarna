import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import Dashboard from "./features/dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "http://51.75.253.157:9001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
