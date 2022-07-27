import React, { useState } from 'react';
import PropTypes from 'react-bootstrap/esm/Image';
import { Form, Button } from 'react-bootstrap';

const initialState = {
  search: '',
};

function Search({ team, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = team.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };

  return (
    <Form className="search">
      <Form.Control className="searchInput" placeholder="Search Players" value={searchInput} onChange={handleChange} />
      <Button type="button" value="" onClick={initialState}>Clear</Button>
    </Form>
  );
}

Search.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};

export default Search;
