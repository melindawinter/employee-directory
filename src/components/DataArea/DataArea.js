import React, { Component } from "react";
import "./DataArea.css";
import Table from "./Table/Table.js";

export default class DataArea extends Component {
    constructor() {
        super();
        this.state = {
            employees: [{}],
            sortedEmployees: [{}],
            order: "descend",
            headings: [
                { name: "Image", width: "10%" },
                { name: "Name", width: "10%" },
                { name: "Phone", width: "20%" },
                { name: "Email", width: "20%" },
                { name: "DOB", width: "10%" }
              ],
              handleSort: heading => {
                if (this.state.order === "descend") {
                  this.setState({
                    order: "ascend"
                  })
                } else {
                  this.setState({
                    order: "descend"
                  })
                }
                const compareFnc = (a, b) => {
                  if (this.state.order === "ascend") {
                    // account for missing values
                    if (a[heading] === undefined) {
                      return 1;
                    } else if (b[heading] === undefined) {
                      return -1;
                    }
                    // numerically
                    else if (heading === "name") {
                      return a[heading].first.localeCompare(b[heading].first);
                    } else {
                      return a[heading] - b[heading];
                    }
                  } else {
                    // account for missing values
                    if (a[heading] === undefined) {
                      return 1;
                    } else if (b[heading] === undefined) {
                      return -1;
                    }
                    // numerically
                    else if (heading === "name") {
                      return b[heading].first.localeCompare(a[heading].first);
                    } else {
                      return b[heading] - a[heading];
                    }
                  }
                }
                const sortedEmployees = this.state.filteredEmployees.sort(compareFnc);
                this.setState({ filteredEmployees: sortedEmployees });
              }
        }

    }

// componentDidMount API.getEmployees 
componentDidMount() {
    API.getEmployees().then(results => {
      this.setState({
        Employees: results.data.results,
        filteredEmployees: results.data.results
      });
      console.log(this.state.filteredEmployees);
    });
  }

    render() {
        return (
            <Table
            headings={this.state.headings}
            employees={this.state.sortedEmployees}
            handleSort={this.state.handleSort}
            />
        );
    }
}