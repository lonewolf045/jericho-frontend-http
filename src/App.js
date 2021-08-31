import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch,Link } from 'react-router-dom';

import UploadFiles from "./components/upload-files.component";
import Login from "./components/login-form.components";
import SignUp from "./components/signup-form.components";
import authService from "./services/auth.service";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import DownloadFiles from "./components/download-files.component";
import AuthVerify from "./common/auth-verify";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if(user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  logOut() {
    authService.logout()
    this.setState({
      currentUser: undefined
    })
  }
  render() {
    const currUser = this.state.currentUser
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <Link to={"/"} className="navbar-brand">
            XYZ Inc.
          </Link>  
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>
          {currUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/download"} className="nav-link">
                  Download Data
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/upload"} className="nav-link">
                  Upload Data
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  SignUp
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="auth-wrapper container mt-3">
          <div className="auth-inner">
            <Switch>
              <Route exact path={["/","/home"]} component={(routeProps) => <Home {...routeProps} logOut = {this.logOut} currUser = {this.state.currentUser}/>} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={SignUp} />
              <Route path="/upload" component={(routeProps) => <UploadFiles {...routeProps} logOut = {this.logOut}/>} />
              <Route path="/download" component={(routeProps) => <DownloadFiles {...routeProps} logOut = {this.logOut}/>} />
              <Route path="/profile" component={(routeProps) => <Profile {...routeProps} logOut = {this.logOut}/>}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
