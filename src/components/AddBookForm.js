import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddBookForm({ onAddBook, onCloseForm }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, totalPages } = formData;

    if (!title || !author || !totalPages) {
      alert('Please fill in all fields.');
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      year: new Date().getFullYear(),
      genre: 'Unknown',
      status: 'wantToRead',
      progress: 0,
      totalPages: parseInt(totalPages, 10),
    };

    onAddBook(newBook);
    setFormData({ title: '', author: '', totalPages: '' });
    onCloseForm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-book-form">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="totalPages">Total Pages:</label>
            <input type="number" id="totalPages" name="totalPages" value={formData.totalPages} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button type="submit">Add Book</button>
            <button type="button" onClick={onCloseForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddBookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

export default AddBookForm;