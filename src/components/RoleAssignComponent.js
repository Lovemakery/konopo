import React, { Component } from "react";

import RoleAssignDataService from "../services/roleassign.service";
import { Link } from "react-router-dom";

export default class RoalAdssign extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveRoles = this.retrieveRoles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRole = this.setActiveRole.bind(this);
    this.removeAllRoles = this.removeAllRoles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
        roles: [],
        currentRole: null,
        currentIndex: -1,
        searchTitle: ""
      };
  }

  componentDidMount() {
    this.retrieveRoles();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveRoles() {
    RoleAssignDataService.getAll()
      .then(response => {
        this.setState({
          roles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveRoles();
    this.setState({
      currentRole: null,
      currentIndex: -1
    });
  }

  setActiveRole(role, index) {
    this.setState({
      currentRole: role,
      currentIndex: index
    });
  }
  removeAllRoles() {
    RoleAssignDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchTitle() {
    this.setState({
      currentRole: null,
      currentIndex: -1
    });

    RoleAssignDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          roles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, roles } = this.state;

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
      <h2 className="text-center">Roles Assignment List</h2>
      <div className = "row">
      <Link to={"/add"} className="nav-link">
      <button className="btn btn-primary" > Assign a Role</button>
              </Link>
         
      </div>
      <br></br>
      <div className = "row">

             <table className = "table table-striped table-bordered">
                 <thead>
                     <tr>
                         <th>Userame</th>
                         <th> Role Name</th>
                         <th>Assign</th>
                         <th> Actions</th>
                     </tr>
                 </thead>
                 <tbody>
                 <td>  </td> 
                     {roles &&
                    roles.map( role=> (
                    <tr key= {role.id}>
                        <td>
                             {role.name}
                        </td>
                        <td>
                             {role.Status}
                        </td>
                        <td>
                             {role.Status}
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
