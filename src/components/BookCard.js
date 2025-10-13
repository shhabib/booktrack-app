import React from 'react';
import ProgressBar from './ProgressBar';
import PropTypes from 'prop-types';
import { STATUSES } from '../data/constants';

function BookCard({ book, onStatusUpdate }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Genre: {book.genre}</p>
      <select
        className="status-select"
        value={book.status}
        onChange={(e) => onStatusUpdate(book.id, e.target.value)}
      >
        {Object.values(STATUSES).map(statusInfo => (
          <option key={statusInfo.id} value={statusInfo.id}>
            {statusInfo.label}
          </option>
        ))}
      </select>
      <ProgressBar progress={book.progress} totalPages={book.totalPages} />
    </div>
  );
}

export default BookCard;

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number,
    genre: PropTypes.string,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number,
    totalPages: PropTypes.number,
  }).isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};