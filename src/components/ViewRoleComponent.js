import React, { Component } from "react";
import RoleDataService from "../services/role.service";
import { withRouter } from '../common/with-router';

class Role extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getRole = this.getRole.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);

    this.state = {
      currentRole: {
        id: null,
        name: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getRole(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentRole: {
          ...prevState.currentTRole,
          name: name
        }
      };
    });
  }

  getRole(id) {
    RoleDataService.get(id)
      .then(response => {
        this.setState({
          currentRole: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentRole.id,
      name: this.state.currentRole.name,
      published: status
    };

    RoleDataService.update(this.state.currentRole.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentRole: {
            ...prevState.currentRole,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRole() {
    RoleDataService.update(
      this.state.currentRole.id,
      this.state.currentRole
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The role was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRole() {    
    RoleDataService.delete(this.state.currentRole.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/roles');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRole } = this.state;

    return (
      <div>
        {currentRole ? (
          <div className="edit-form">
            <h4>Role</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentRole.name}
                  onChange={this.onChangeName}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentRole.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentRole.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRole}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRole}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Role...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Role);