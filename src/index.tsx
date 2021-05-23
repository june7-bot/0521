import reactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/LoginSuccess";
import Register from "./components/Register";
import "./index.css";
import axios from "axios";
import Header from "./components/Header";

//jwt 세팅
axios.defaults.baseURL = "http://localhost";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

reactDom.render(<App />, document.getElementById("root"));
