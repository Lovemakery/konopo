import React, { Component } from "react";

import RoleDataService from "../services/role.service";
import { Link } from "react-router-dom";

export default class RoleAssign extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveRoles = this.retrieveRoles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRole = this.setActiveRole.bind(this);
    this.removeAllRoles = this.removeAllRoles.bind(this);
    this.deleteRole = this.deleteRole.bind(this);

    this.searchName = this.searchName.bind(this);
    this.state = {
        roles: [],
        currentRole: null,
        currentIndex: -1,
        searchName: ""
      };
  }

  componentDidMount() {
    this.retrieveRoles();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveRoles() {
    RoleDataService.getAll()
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
    RoleDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteRole() {    
    RoleDataService.delete(this.state.roles.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/roles');
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    this.setState({
      currentRole: null,
      currentIndex: -1
    });

    RoleDataService.findByName(this.state.searchName)
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
    const { searchTitle, roles, currentRole, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
        <h4>What do you want to do?</h4>

        <ul className="list-group">
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
              placeholder="Search by role name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      <h2 className="text-center">Roles List</h2>
      <div className = "row">
         <button className="btn btn-primary" onClick={this.addRole}> Add Role</button>
      </div>
      <br></br>
      <div className = "row">
             <table className = "table table-striped table-bordered">
                 <thead>
                     <tr>
                         <th> Role Name</th>
                         <th>Status</th>
                         <th> Actions</th>
                      </tr>
                 </thead>
                 <tbody>
                 <td>  </td> 
                     {roles &&
                    roles.map( role=> (
                    <tr key= {role.id}>
                        <td>
                        </td>
                        <td>
                        {role.active ? "Active" : "Not Active"}
                        </td>
                        <td>
                        <button className="btn btn-info">Update </button>
                        <button style={{marginLeft: "5px"}}  className="btn btn-danger" onClick={this.role}>Delete </button>
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
