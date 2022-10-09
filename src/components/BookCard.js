import propTypes from "prop-types";

const BookCard = ({ book, isFromSearch, isIncluded, updateBookShelf }) => {
  const options = [
    {
      name: "Currently Reading",
      value: "currentlyReading",
    },
    {
      name: "Want to Read",
      value: "wantToRead",
    },
    {
      name: "Read",
      value: "read",
    },
    {
      name: "None",
      value: "none",
    },
  ];

  const getOptions = () => {
    if (isFromSearch && isIncluded === false) {
      options.pop();
    }
    return options;
  };

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
            defaultValue={
              book.shelf === null || book.shelf === undefined
                ? "none"
                : book.shelf
            }
            onChange={(event) => {
              updateBookShelf(book, event.target.value);
            }}
          >
            <option value="none" disabled>
              {isFromSearch && isIncluded === false
                ? "Add to ..."
                : "Move to..."}
            </option>
            {getOptions().map((opt) => {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {(book.authors === null || book.authors) === undefined ? (
        <div className="book-authors">Unknown author</div>
      ) : (
        <div className="book-authors">{book.authors[0]}</div>
      )}
    </div>
  );
};

BookCard.propTypes = {
  book: propTypes.object.isRequired,
  isFromSearch: propTypes.bool.isRequired,
  isIncluded: propTypes.bool.isRequired,
  updateBookShelf: propTypes.func.isRequired,
};

export default BookCard;
