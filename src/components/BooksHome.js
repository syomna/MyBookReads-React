import propTypes from "prop-types";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const BooksHome = ({ books, updateBookShelf }) => {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf="Currently Reading"
              books={books}
              updateBookShelf={updateBookShelf}
            />
            <BookShelf
              shelf="Want to Read"
              books={books}
              updateBookShelf={updateBookShelf}
            />
            <BookShelf
              shelf="Read"
              books={books}
              updateBookShelf={updateBookShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

BooksHome.propTypes = {
  books: propTypes.array.isRequired,
  updateBookShelf: propTypes.func.isRequired,
};

export default BooksHome;
