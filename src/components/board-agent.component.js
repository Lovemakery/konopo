import React, { Component, useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import TransactionDataService from "../services/transaction.service";
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



const vmobilenumber = value => {
  if (value.length < 8 || value.length > 12) {
    return (
      <div className="alert alert-danger" role="alert">
        The code must be between 8 and 12 numbers.
      </div>
    );
  }
}
const vcode = value => {
  if (value.length < 4 || value.length > 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The code must be between 4 and 6 numbers.
      </div>
    );
  }
};

export default class BoardAgent  extends Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
    this.onChangeMobilenumber= this.onChangeMobilenumber.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.state = {
    
      msisdn: "",
      oneTimeCode: "",
      successful: false,
      message: ""
    };
  }
  onChangeMobilenumber(e) {
    this.setState({
      msisdn: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      oneTimeCode: e.target.value
    });
  }

  handleContinue(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      TransactionDataService.continue(
        AuthService.getCurrentUser().phone,
        this.state.msisdn,
        this.state.oneTimeCode
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="list row">
     
      <div className="col-md-4">
        <h4>What do you want to do?</h4>

        <ul className="list-group">
              <Link to="/agent">
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
              <Link to="/transactions">

              <li
                className="list-group-item " 
              >
               Agent Transactions
              </li>
              </Link>
              
        </ul>
      </div>
      <div className="col-md-4">
        <div className="card card-container">

          <Form
            onSubmit={this.handleContinue}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="mobilenumber">Phone number</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="msisdn"
                    value={this.state.msisdn}
                    onChange={this.onChangeMobilenumber}
                    validations={[required, vmobilenumber]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="code">Pin Code</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="oneTimeCode"
                    value={this.state.oneTimeCode}
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
