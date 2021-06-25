import React from "react";

function SearchBar({ onChangeActive, value, searchBar, searchedUser }) {
  const onChange = (event) => {
    onChangeActive(event);
  };
  const onSearch = (event) => {
    let value = event.target.value.toLowerCase();
    searchBar(value);
  };
  return (
    <div className="row">
      <div className="col-10">
        <input
          type="input"
          className="form-control rounded-pill px-4"
          placeholder="Search..."
          onChange={onSearch}
          value={searchedUser}
        />
      </div>
      <div className="col-2 d-flex align-items-center">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={onChange}
            checked={value}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Active
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
