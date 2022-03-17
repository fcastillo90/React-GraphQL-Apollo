
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { sorting } = require("./utils.ts");
const mockData = require('../MOCK_DATA.json');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Datum {
    id: Int
    first_name: String
    last_name: String
    email: String
    gender: String
    avatar: String
    company_name: String
    job_title: String
    language: String
  }

  input GridSortItem {
    field: String
    sort: String
  }

  type Query {
    data(page: Int, size: Int, sort: GridSortItem): [Datum!]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    data: (_parent, {page, size, sort}) => {
      if (!sort) return mockData.slice(page*size, page*size + size)
      
      return mockData.sort(
        (a, b) => sorting({field: sort.field, sort: sort.sort, a, b})
      ).slice(page*size, page*size + size)
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(process.env.REACT_APP_APOLLO_SERVER_PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
