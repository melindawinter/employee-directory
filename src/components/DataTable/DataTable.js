import React from "react";
import "./Table.css";

function Table({ headings, employees, handleSort}) {
    return (
        <div className="datatable">
            <table id="employee-table" class="table table-striped table-hover table-condensed">
                <thead>
                    <tr>
                        {headings.map(({ name, width }) => {
                            return (
                                <th
                                    className="col"
                                        key={name}
                  style={{ width }}
                  onClick={() => {
                    handleSort(name.toLowerCase());
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
                    </tr>
                </thead>
                <tbody>
                {employees[0] !== undefined && employees[0].name !== undefined ? (
        employees.map(({ login, name, picture, phone, email, dob }) => {
          return (
            <tr key={login.uuid}>
              <td data-th="Image" className="align-middle">
                <img
                  src={picture.medium}
                  alt={"profile image for " + name.first + " " + name.last}
                  className="img-responsive"
                />
              </td>
              <td data-th="Name" className="name-cell align-middle">
                {name.first} {name.last}
              </td>
              <td data-th="Phone" className="align-middle">
                {phone}
              </td>
              <td data-th="Email" className="align-middle">
                <a href={"mailto:" + email} target="__blank">
                  {email}
                </a>
              </td>
              <td data-th="DOB" className="align-middle">
                {dob.date}
              </td>
            </tr>
          );
        })
      ) : (
        <p>Oops! Something went wrong.</p>
      )}
                </tbody>
            </table>
        </div>
    );
}