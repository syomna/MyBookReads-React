import "./App.css";
import { useState, useEffect } from "react";
import * as BooksApi from "./BooksAPI";
import { Routes, Route } from "react-router-dom";
import BooksHome from "./components/BooksHome";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const updateBookShelf = async (book, shelf) => {
    const res = await BooksApi.update(book, shelf);
    console.log(res);
    const getBooks = async () => {
      const books = await BooksApi.getAll();
      setBooks(books);
    };
    getBooks();
  };

  const searchBooks = async (searchValue) => {
    const res = await BooksApi.search(searchValue, 10);
    if (Array.isArray(res)) {
      setSearchedBooks([...res]);
    }
  };

  const onSearchChanged = (searchValue) => {
    setSearch(searchValue);
    if (searchValue !== "") {
      searchBooks(searchValue);
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
