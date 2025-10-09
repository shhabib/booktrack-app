import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import Header from './Header';
import './components.css'; // Styles for BookCard, ProgressBar, etc.

function App() { 
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <BookList books={books} />
      </main>
    </div>
  );
}
export default App;