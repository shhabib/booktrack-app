import React from 'react';
import BookCard from './BookCard';
import PropTypes from 'prop-types';

function BookList({ books, onStatusUpdate }) {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} onStatusUpdate={onStatusUpdate} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};

export default BookList;