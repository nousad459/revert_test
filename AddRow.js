import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import logo from "./logo.svg";
import "./App.css";

class AddRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tablerows: [
        //{ fname:""}
      ],
      name: "",
      change: "",
    };
    this.addRow = this.addRow.bind(this);
    //this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }
  addRow() {
    // add new data from here
    var newdata = { fname: this.state.name /*lname:"Moody",age:23*/ };
    //take the existing state and concat the new data and set the state again
    this.setState({ tablerows: this.state.tablerows.concat(newdata) });
  }
  handleDeleteRow(index) {
    let rows = [...this.state.tablerows];
    rows.splice(index, 1);
    this.setState({
      tablerows: rows,
    });
  }
  handleEditRow(index) {
    console.log("nnnnn", index);
    const user = Object.assign([], this.state.tablerows[index]);

    user.fname = this.state.change;

    const users = Object.assign([], this.state.tablerows);
    users[index] = user;
    this.setState({ tablerows: users });
  }
  render() {
    const dd = Object.assign([], this.state.tablerows);
    console.log("nnnnn>>>>", dd);
    return (
      <div>
        <table>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>Action</td>
          </tr>
          {/* <tr>
                
            </tr>
            <tr>
                
            </tr> */}
          {this.state.tablerows
            ? this.state.tablerows.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {row.fname}
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ change: e.target.value }, () => {
                            console.log("changename>>", this.state.change);
                          })
                        }
                        style={{ width: "100px", height: "10px" }}
                      />
                    </td>
                    {/* <td>{row.age}</td> */}
                    <button onClick={() => this.handleDeleteRow(index)}>
                      Delete Row
                    </button>
                    <button onClick={(e) => this.handleEditRow(index, e)}>
                      Edit
                    </button>
                  </tr>
                );
              })
            : null}
        </table>
        <input
          type="text"
          onChange={(e) =>
            this.setState({ name: e.target.value }, () => {
              console.log("<<<<<<", this.state.name);
            })
          }
        />
        <button id="addBtn" onClick={this.addRow}>
          ADD
        </button>
      </div>
    );
  }
}

export default AddRow;
