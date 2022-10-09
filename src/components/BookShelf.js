import BookCard from "./BookCard";
import propTypes from "prop-types";

const BookShelf = ({ shelf, books, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              shelf.toLowerCase().replaceAll(" ", "") ===
                book.shelf.toLowerCase() && (
                <li key={book.id}>
                  <BookCard
                    book={book}
                    isFromSearch={false}
                    isIncluded={false}
                    updateBookShelf={updateBookShelf}
                  />
                </li>
              )
            );
          })}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelf: propTypes.string.isRequired,
  books: propTypes.array.isRequired,
  updateBookShelf: propTypes.func.isRequired,
};

export default BookShelf;
