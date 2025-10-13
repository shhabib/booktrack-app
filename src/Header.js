import React from 'react';
import PropTypes from 'prop-types';

function Header({ onAddNewBook }) {
  return (
    <header>
      <h1>BookTrack</h1>
      <button onClick={onAddNewBook} className="add-book-btn">Add New Book</button>
    </header>
  );
}

Header.propTypes = {
  onAddNewBook: PropTypes.func.isRequired,
};

export default Header;