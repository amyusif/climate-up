import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "./Search.css";

const Searchbar = ({onHanleChange}) => {
  const [Search, setSearch] = useState(null);

  const handleChange = (value) => {
    setSearch(value);
    onHanleChange(value);
  };
  return (
    <div className="search">
      <AsyncPaginate
        value={Search}
        placeholder="Search for a city"
        onChange={handleChange}
        debounceTimeout={600}
      />
    </div>
  );
};

export default Searchbar;
