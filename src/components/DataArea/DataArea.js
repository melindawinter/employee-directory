
import React, { useState, useEffect } from "react";
import "./DataArea.css";
import DataTable from "./DataTable/DataTable.js";
import "../Nav/Nav.js";
import API from "../../utils/API.js";
import DataAreaContext from "../../utils/DataAreaContext.js";


const DataArea = () => {
const [developerState, setDeveloperState] = useState({
      employees: [],
      filteredEmployees: [],
      order: "descend",
      headings: [
        { name: "Image", width: "10%", order: "descend" },
        { name: "Name", width: "10%", order: "descend" }, 
        { name: "Phone", width: "20%", order: "descend" },
        { name: "Email", width: "20%", order: "descend" },
        { name: "DOB", width: "10%", order: "descend" }
      ],
     
     
      handleSort: heading => {
        if (this.state.order === "descend") {
          this.setState({
            order: "ascend"
          });
        } else {
          this.setState({
            order: "descend"
          });
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
        };
        const sortedEmployees = this.state.filteredEmployees.sort(compareFnc);
        this.setState({ filteredEmployees: sortedEmployees });
      }
    };
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
