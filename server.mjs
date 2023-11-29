import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import express from "express";
import  cors from "cors";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, Apollo Server!",
  },
};

const app = express();

// Enable CORS
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  const port = 4002;
  app.listen(port, () => {
    console.log(
      `Apollo Server is running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startApolloServer();
