const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Configure the GraphQL API server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// Start the server.
server.listen().then(async ({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`); // eslint-disable-line no-console
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`); // eslint-disable-line no-console
});
