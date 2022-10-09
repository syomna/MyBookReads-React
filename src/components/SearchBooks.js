import { Link } from "react-router-dom";
import propTypes from "prop-types";
import BookCard from "./BookCard";

const SearchBooks = ({
  books,
  value,
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

  let isIncluded = false;

  const getBook = (book) => {
    const isExits = books.some((item) => item.id === book.id);
    if (isExits) {
      const b = books.find((element) => element.id === book.id);
      isIncluded = true;
      return b;
    } else {
      isIncluded = false;
      return book;
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
                return (
                  bookValidate(book) && (
                    <li key={getBook(book).id}>
                      <BookCard
                        book={getBook(book)}
                        isFromSearch={true}
                        isIncluded={isIncluded}
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
            <p>No Books</p>
          </div>
        )}
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  books: propTypes.array.isRequired,
  value: propTypes.string.isRequired,
  onSearchChanged: propTypes.func.isRequired,
  searchedBooks: propTypes.array,
  updateBookShelf: propTypes.func.isRequired,
};

export default SearchBooks;
