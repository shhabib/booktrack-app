import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import Header from './Header';
import SearchBar from './components/SearchBar';
import AddBookForm from './components/AddBookForm';
import './components.css'; // Styles for BookCard, ProgressBar, etc.

function App() { 
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAddBook = (newBookData) => {
    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBookData),
    })
      .then(response => response.json())
      .then(addedBook => {
        setBooks(prevBooks => [...prevBooks, addedBook]);
      })
      .catch(error => console.error("Error adding book:", error));
  };

  const handleStatusUpdate = (bookId, newStatus) => {
    fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prevBooks => 
          prevBooks.map(book => book.id === bookId ? updatedBook : book)
        );
      })
      .catch(error => console.error("Error updating status:", error));
  };

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app-container">
      <Header onAddNewBook={() => setIsFormVisible(true)} />
      <main>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <BookList books={filteredBooks} onStatusUpdate={handleStatusUpdate} />
      </main>
      {isFormVisible && (
        <AddBookForm onAddBook={handleAddBook} onCloseForm={() => setIsFormVisible(false)} />
      )}
    </div>
  );
}
export default App;