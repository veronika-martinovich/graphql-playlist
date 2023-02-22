import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <BookForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
