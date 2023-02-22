import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState(null);

  return (
    <div id="main">
      {loading && <span>Loading...</span>}
      <ul id="book-list">
        {data &&
          data?.books.map((item) => (
            <li key={item.id} onClick={() => setSelectedBookId(item.id)}>
              {item.name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
};

export default BookList;
