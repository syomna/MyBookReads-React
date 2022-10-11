import "./App.css";
import { useState, useEffect } from "react";
import * as BooksApi from "./BooksAPI";
import { Routes, Route } from "react-router-dom";
import BooksHome from "./components/BooksHome";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [timer, setTimer] = useState(null);

  const updateBookShelf = async (book, shelf) => {
    book.shelf = shelf;
    const res = await BooksApi.update(book, shelf);
    console.log(res);
    setBooks([...books.filter((b) => b.id !== book.id), book]);
  };

  const searchBooks = async (searchValue) => {
    try {
      setSearchedBooks([]);
      setMessage("Loading....");
      const res = await BooksApi.search(searchValue, 10);
      if (Array.isArray(res)) {
        setSearchedBooks([...res]);
        setMessage(null);
      } else {
        setMessage("No Books Found.");
      }
    } catch (error) {
      setMessage("An unexpected error occured.");
    }
  };

  const onSearchChanged = (searchValue) => {
    setSearch(searchValue);
    if (searchValue !== "") {
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        searchBooks(searchValue);
      }, 1500);

      setTimer(newTimer);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getBooks = async () => {
      const res = await BooksApi.getAll();
      if (mounted) {
        setBooks(res);
      }
    };
    getBooks();

    return {
      mounted: false,
    };
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <BooksHome
            books={books}
            updateBookShelf={(book, shelf) => {
              updateBookShelf(book, shelf);
            }}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchBooks
            books={books}
            value={search}
            onSearchChanged={(event) => {
              onSearchChanged(event.target.value);
            }}
            message={message}
            searchedBooks={searchedBooks}
            updateBookShelf={(book, shelf) => {
              updateBookShelf(book, shelf);
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
