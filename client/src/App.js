import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div className="App">
    <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            {/* 404 page */}
            <Route exact component={NoMatch} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
