import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    skip: !bookId,
  });

  return (
    <>
      {data && (
        <div id="book-details">
          <p>
            <h4>{"Title: "}</h4>
            {data.book.name}
          </p>
          <p>
            <h4>{"Author: "}</h4>
            {data.book.author.name}
          </p>
          <h4> {"All books by this author: "}</h4>
          <ul>
            {data.book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BookDetails;
