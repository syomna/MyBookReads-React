import { Link } from "react-router-dom";
import propTypes from "prop-types";
import BookCard from "./BookCard";

const SearchBooks = ({
  books,
  value,
  message,
  onSearchChanged,
  searchedBooks,
  updateBookShelf,
}) => {
  const haveBooks = () => {
    if (searchedBooks.length !== 0 && value !== "") {
      return true;
    } else {
      return false;
    }
  };

  const bookValidate = (book) => {
    if (book !== null || book !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={value}
              onChange={onSearchChanged}
            />
          </div>
        </div>
        {haveBooks() ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks.map((book) => {
                let shelf = "none";
                for (var b of books) {
                  if (b.id === book.id) {
                    shelf = b.shelf;
                  }
                }
                return (
                  bookValidate(book) && (
                    <li key={book.id}>
                      <BookCard
                        book={book}
                        shelf={shelf}
                        updateBookShelf={updateBookShelf}
                      />
                    </li>
                  )
                );
              })}
            </ol>
          </div>
        ) : (
          <div className="search-books-results">
            {message === null ? <p>Search for Books!</p> : <p>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  books: propTypes.array.isRequired,
  message: propTypes.any,
  value: propTypes.string.isRequired,
  onSearchChanged: propTypes.func.isRequired,
  searchedBooks: propTypes.array,
  updateBookShelf: propTypes.func.isRequired,
};

export default SearchBooks;
