import React, { Component} from "react";

import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";

export default class TransactionsComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTransaction = this.setActiveTransaction.bind(this);
    this.removeAllTransaction = this.removeAllTransaction.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
        transactions: [],
        currentTransaction: null,
        currentIndex: -1,
        searchTitle: ""
      };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTransactions() {
    TransactionDataService.getAll()
      .then(response => {
        this.setState({
        transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveTransactions();
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });
  }

  setActiveTransaction(transaction, index) {
    this.setState({
      currentTransaction: transaction,
      currentIndex: index
    });
  }
  removeAllTransaction() {
    TransactionDataService.deleteAll()
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
      currentTransaction: null,
      currentIndex: -1
    });

    TransactionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
         transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, transactions } = this.state;

    return (
      <div className="list row">
        <div className="col-md-4">
        <h4>What do you want to do?</h4>

        <ul className="list-group">
              <Link to="/agent">
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
      <div className="col-md-8">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Transaction name"
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
      <h2 className="text-center">Transactions List</h2>
      <br></br>
      <div className = "row">
             <table className = "table table-striped table-bordered">
                 <thead>
                     <tr>
                          
                         <th>Agent code</th>
                         <th>Customer</th>
                         <th>Transaction Type</th>
                         <th>Status</th>
                         <th>Pin Code</th>
                         <th>Amount</th>
                         <th>Fees</th>
                         <th> Actions</th>
                      </tr>
                 </thead>
                 <tbody>
                 <td>  </td> 
                     {transactions &&
                    transactions.map( transaction=> (
                    <tr key= {transaction.id}>
                        <td>
                             {transaction.creditParty.msisdn}
                        </td> 
                        <td>
                             {transaction.debitParty.msisdn}
                        </td> 
                        
                        <td>
                             {transaction.type}
                        </td> 
                        <td>
                             
                        </td> 
                        <td>
                             {transaction.oneTimeCode}
                        </td>
                        <td>
                             {transaction.amount}
                        </td> 
                        <td>
                            
                        </td> 
                        <td>
                        <button className="btn btn-info">Print </button>
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
