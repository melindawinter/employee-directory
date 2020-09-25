import React, { useState, useEffect } from "react";
import "./DataArea.css";
import DataTable from "./DataTable/DataTable.js";
import "../Nav/Nav.js";
import API from "../../utils/API.js";
import DataAreaContext from "../../utils/DataAreaContext.js";

const DataArea = () => {
  // Set up headings and display order
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
    ]
  });

  //  Handles the change from descending to ascending and vice versa
  const handleSort = heading => {
    let currentOrder = developerState.headings
      .filter(elem => elem.name === heading)
      .map(elem => elem.order)
      .toString();

    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareFnc = (a, b) => {
      if (currentOrder === "ascend") {
        // Account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "dob") {
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        } else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    // Set variables for employees that have been sorted and reversed headings
    const sortedEmployees = developerState.filteredEmployees.sort(compareFnc);
    const updatedHeadings = developerState.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredEmployees: sortedEmployees,
      headings: updatedHeadings
    });
  };

  const handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.employees.filter(item => {
      let values =
        item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
      console.log(filter, values);
      if (values.indexOf(filter.toLowerCase()) !== -1) {
        return item;
      }
    });

    setDeveloperState({
      ...developerState,
      filteredEmployees: filteredList
    });
  };

  // Allows the API to be used
  useEffect(() => {
    API.getEmployees().then(results => {
      setDeveloperState({
        ...developerState,
        employees: results.data.results,
        filteredEmployees: results.data.results
      });
    });
  }, []);

  return (
    // Provider makes Redux available
    <DataAreaContext.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <DataTable /> : <div></div>}
      </div>
    </DataAreaContext.Provider>
  );
};

export default DataArea;
