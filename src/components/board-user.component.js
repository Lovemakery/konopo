import React, { Component, useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

export default class BoardUser extends Component {
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
     
      <div className="col-md-4">
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
      <div className="col-md-8">
        <div className="card card-container">

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="mobimoney">Mobile Money</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="mobimoney"
                    value={this.state.mobimoney}
                    onChange={this.onChangeMobimoney}
                    validations={[required, vmobimoney]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                    validations={[required, vamount]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="code">Agent Code</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="code"
                    value={this.state.code}
                    onChange={this.onChangeCode}
                    validations={[required, vcode]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Continue</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    </div>
    );
  }
}
