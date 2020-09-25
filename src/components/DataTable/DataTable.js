import React, { useContext } from "react";
import "./DataTable.css";
import DataBody from "../DataBody/DataBody.js";
import DataAreaContext from "../../utils/DataAreaContext.js";

// Sets up basic information for formatting the table
const DataTable = () => {
  const context = useContext(DataAreaContext);

  return (
    // Use bootstrap to format table
    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {context.developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    context.handleSort(name);
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>

        <DataBody />
      </table>
    </div>
  );
};

export default DataTable;
