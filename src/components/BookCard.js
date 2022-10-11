import propTypes from "prop-types";

const BookCard = ({ book, shelf, updateBookShelf, getDetails }) => {
  const imagesValidate = () => {
    if (book.imageLinks === null || book.imageLinks === undefined) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="book">
      <div className="book-top">
        {imagesValidate() ? (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
        ) : (
          <p>No Image</p>
        )}
        <div className="book-shelf-changer">
          <select
            defaultValue={shelf}
            onChange={(event) => {
              updateBookShelf(book, event.target.value);
            }}
          >
            <option value="go-to" disabled>
              {shelf !== "none" ? "Move to..." : "Add to ..."}
            </option>
            <option key="currentlyReading" value="currentlyReading">
              Currently Reading
            </option>
            <option key="wantToRead" value="wantToRead">
              Want to Read
            </option>
            <option key="read" value="read">
              Read
            </option>
            {shelf === "none" && (
              <option key="none" value="none">
                None
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {(book.authors === null || book.authors) === undefined ? (
        <div className="book-authors">Unknown author</div>
      ) : (
        <div className="book-authors">{book.authors.join(" , ")}</div>
      )}
    </div>
  );
};

BookCard.propTypes = {
  book: propTypes.object.isRequired,
  shelf: propTypes.string.isRequired,
  updateBookShelf: propTypes.func.isRequired,
};

export default BookCard;
