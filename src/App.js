import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAgent from "./components/board-agent.component";
import TransactionsComp from "./components/transaction.Component";
import CheckBalance from "./components/checkBalanceComponent";
import AgentTransactions from "./components/AgentTransactionComponent";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
//import CreateRoleComponent from './components/CreateRoleComponent';
import UpdateRoleComponent from './components/UpdateRoleComponent';
import ViewRoleComponent from './components/ViewRoleComponent';
import UsersComponent from './components/UsersComponent';
import AddUser from './components/AddUserComponent';
import RoalAdssign from './components/RoleAssignComponent';
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showAgentBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showAgentBoard: user.roles.includes("ROLE_AGENT"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showAgentBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showAgentBoard, } = this.state;

    return (
      
      <div>
        <header id="page-topbar">
        <nav className="navbar navbar-header navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
           Konopo
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showAgentBoard && (
              <li className="nav-item">
                <Link to={"/agent"} className="nav-link">
                  Agent Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              
            )}
          </div>

          {currentUser ? (
            
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
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
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        </header>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/balance" element={<CheckBalance />} />
            <Route path="/agenttransaction" element={<AgentTransactions />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/agent" element={<BoardAgent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/transactions" element={<TransactionsComp />} />
            <Route path="/users" element={<UsersComponent />} />
            <Route path="/adduser" element={<AddUser/>} />
            <Route path="/roleassign" element={<RoalAdssign/>} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
