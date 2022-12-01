import React, { Component} from "react";

import UserDataService from "../services/users.service";
import { Link } from "react-router-dom";

export default class UsersComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchUsername = this.searchUsername.bind(this);
    this.state = {
      userregistrations: [],
        currentUser: null,
        currentIndex: -1,
        searchUsername: ""
      };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          userregistrations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }
  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchUsername() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserDataService.findByUsername(this.state.searchUsername)
      .then(response => {
        this.setState({
          userregistrations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchUsername, userregistrations} = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
        <h4>What do you want to do?</h4>

        <ul className="list-group">
             <Link to="/users">
              <li
                className="list-group-item " 
              >
                Users
              </li>
              </Link>
              <Link to="/admin">
              <li
                className="list-group-item " 
              >
               Roles
              </li>
              </Link>
              <Link to="/roleassign">
              <li
                className="list-group-item " 
              >
                Role Assignment
              </li>
              </Link>
              <Link to="/transactions">

              <li
                className="list-group-item " 
              >
               Transactions
              </li>
              </Link>
        </ul>
      </div>
      <div className="col-md-6">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      <h2 className="text-center">Users List</h2>
      <div className = "row">
      <Link to={"/adduser"} className="nav-link">
      <button className="btn btn-primary" > Add User</button>
              </Link>
         
      </div>
      <br></br>
      <div className = "row">
             <table className = "table table-striped table-bordered">
                 <thead>
                     <tr>
                         <th>Userame</th>
                         <th>Phone</th>
                         <th>Firstname</th>
                         <th>Surname</th>
                         <th>Email</th>
                         <th>Created At</th>
                         <th>Updated At</th>
                         <th>Status</th>
                         <th> Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                 <td>  </td> 
                     {userregistrations &&
                    userregistrations.map( user=> (
                    <tr key= {user.id}>
                        <td>
                             {user.username}
                        </td>
                        <td>
                             {user.firstname}
                        </td>
                        <td>
                             {user.surname}
                        </td>
                        <td>
                             {user.email}
                        </td>
                        <td>
                             {user.createdAt}
                        </td>
                        <td>
                             {user.updatedAt}
                        </td>
                        <td>
                             {user.Status}
                        </td>
                        <td>
                        <button className="btn btn-info">Update </button>
                        <button style={{marginLeft: "5px"}}  className="btn btn-danger">Delete </button>
                        </td>
                    </tr>    
                    ))}
                 </tbody>
             </table>
      </div>
      </div>
 </div>
    );
  }
}
