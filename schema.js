const { gql } = require('apollo-server');
// String, Int, Float, Boolean, ID, !(Not Null)

module.exports.typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
    averageRating: Int
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!,
  }

  input ProductsFilterInput {
    onSale: Boolean
    averageRating: Int
  } 

  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID): Product
    categories: [Category!]!
    category(id: ID): Category
    reviews: [Review!]!
  }

  input ProductInput{
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String
    onSale: Boolean!
  }
  
  input ProductInputUpdate{
    name: String
    description: String
    quantity: Int
    price: Float
    image: String
    onSale: Boolean
  }


  input ReviewInput{
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input ReviewInputUpdate{
    date: String
    title: String
    comment: String
    rating: Int
    productId: ID
  }

  type Mutation{
    createCategory(categoryName: String!): Category
    createProduct(input: ProductInput): Product
    createReview(input: ReviewInput): Review
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, categoryName: String!): Category!
    updateProduct (id: ID!, input: ProductInputUpdate): Product
    updateReview (id: ID!, input: ReviewInputUpdate): Review
  }
`;