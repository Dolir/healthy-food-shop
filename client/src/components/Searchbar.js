import React from "react";
import { Redirect } from "react-router-dom";

function Searchbar() {
  const [redirect, setRedirect] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  function onChange(e) {
    setSearchTerm(e.target.value);
    if (redirect) {
      setRedirect(false);
    }
  }
  function onSubmit(e) {
    e.preventDefault();

    setRedirect(true);
  }
  return (
    <form onSubmit={onSubmit}>
      {redirect ? <Redirect to={`/search/${searchTerm}/page/1`} /> : ""}
      <input
        className="searchbar"
        placeholder="Search"
        value={searchTerm}
        onChange={onChange}
      />
    </form>
  );
}

export default Searchbar;
