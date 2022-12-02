import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link } from 'react-router-dom';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vamount = value => {
  if (value.length < 10 || value.length > 2500) {
    return (
      <div className="alert alert-danger" role="alert">
        The amount must be between 10 and 2500 characters.
      </div>
    );
  }
};
const vmobimoney = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Please select mobile money 
      </div>
    );
  }
};

const vcode = value => {
  if (value.length < 4 || value.length > 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The code must be between 4 and 6 numbers.
      </div>
    );
  }
};

export default class AgentTransactions extends Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
    this.onChangeMobimoney = this.onChangeMobimoney.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.state = {
      mobimoney: "",
      code: "",
      amount: "",
      successful: false,
      message: ""
    };
  }
  onChangeMobimoney(e) {
    this.setState({
      mobimoney: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
     amount: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }

  handleContinue(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

 
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="list row">
     
      <div className="col-md-6">
        <h4>What do you want to do?</h4>

        <ul className="list-group">
              <Link to="/user">
              <li
                className="list-group-item " 
              >
                Cash Out
              </li>
              </Link>
              <Link to="/balance">
              <li
                className="list-group-item " 
              >
                Check balance
              </li>
              </Link>
              <Link to="/agenttransaction">

              <li
                className="list-group-item " 
              >
               Agent Transactions
              </li>
              </Link>
              
        </ul>
      </div>
      <div className="col-md-6">
        <div className="container">

        <div>
                 <h2 className="text-center">Transactions List</h2>
                 
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Description</th>
                                    <th> Date</th>
                                    <th> Amount</th>
                                    <th> Agent Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                        <td> Amount withdrawal</td>   
                                        <td> 20/11/2022</td>
                                        <td> 2000</td>
                                        <td> 546482</td>
                                        <td>
                                            <button  className="btn btn-info">View </button>
                                        </td>
                                </tr>
                                <tr >
                                        <td> Amount withdrawal</td>   
                                        <td> 21/11/2022</td>
                                        <td> 4500</td>
                                        <td> 546454</td>
                                        <td>
                                            <button  className="btn btn-info">View </button>
                                        </td>
                                </tr>
                                <tr >
                                        <td> Amount withdrawal</td>   
                                        <td> 02/11/2022</td>
                                        <td> 5000</td>
                                        <td> 454622</td>
                                        <td>
                                            <button  className="btn btn-info">View </button>
                                        </td>
                                </tr>
                                <tr >
                                        <td> Amount withdrawal</td>   
                                        <td> 15/11/2022</td>
                                        <td> 1200</td>
                                        <td> 425624</td>
                                        <td>
                                            <button  className="btn btn-info">View </button>
                                        </td>
                                </tr>
                                <tr >
                                        <td> Amount withdrawal</td>   
                                        <td> 19/11/2022</td>
                                        <td> 564</td>
                                        <td> 464563</td>
                                        <td>
                                            <button  className="btn btn-info">View </button>
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                 </div>

            </div>
        </div>
      </div>
    </div>
    );
  }
}
