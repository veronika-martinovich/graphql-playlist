import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries/queries";

const BookForm = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  const [bookData, setBookData] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const handleBookData = (e, fieldName) => {
    setBookData({
      ...bookData,
      [fieldName]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookData.name || !bookData.genre || !bookData.authorId) return;
    addBook({
      variables: bookData,
      refetchQueries: () => [{ query: GET_BOOKS }],
    });
  };

  return (
    <form id="book-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" onChange={(e) => handleBookData(e, "name")} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" onChange={(e) => handleBookData(e, "genre")} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={(e) => handleBookData(e, "authorId")}>
          <option disabled selected>
            Select author
          </option>
          <>
            {data &&
              data.authors.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </>
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default BookForm;
