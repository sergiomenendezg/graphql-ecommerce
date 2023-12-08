const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { db } = require('./data');
const { Query } = require('./resolvers/Query')
const { Product } = require('./resolvers/Product')
const { Category } = require('./resolvers/Category');
const { Mutation } = require('./resolvers/Mutation');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
    Mutation
  },
  context: { db}
});

server.listen().then( ({url}) => {

  console.log('Server is ready at ' + url)
})