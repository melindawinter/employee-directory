import React, { useContext } from "react";
import "./SearchName.css";
import DataAreaContext from "../utils/DataAreaContext";

// Creates a search box to search by employee name
const SearchName = () => {
  const context = useContext(DataAreaContext);

  return (
    <div className="searchbox">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            Search
          </span>
        </div>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="name"
          aria-label="Search"
          onChange={e => context.handleSearchChange(e)}
        />
      </div>
    </div>
  );
};
export default SearchName;
