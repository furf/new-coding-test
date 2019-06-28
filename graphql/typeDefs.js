const { gql } = require('apollo-server');

const Driver = `
  type Driver {
    driveTime: Float!
    dispatchedAt: Float!
    willArriveAt: Float!
    timeToArrival: Float!
  }
`;

// Not requiring id or health because orders do not have them when entered
const Order = `
  type Order {
    id: Int
    name: String!
    temp: String!
    shelfLife: Float!
    decayRate: Float!
    driver: Driver!
    health: Float
    createdAt: Float!
  }
`;

const Shelf = `
  type Shelf {
    capacity: Int!
    orders: [Order!]!
    decayFactor: Int!
  }
`;

const ExpeditorShelves = `
  type ExpeditorShelves {
    hot: Shelf!
    cold: Shelf!
    frozen: Shelf!
    overflow: Shelf!
    delivery: Shelf!
    waste: Shelf!
  }
`;

const Expeditor = `
  type Expeditor {
    shelves: ExpeditorShelves!
  }
`;

const Query = `
  type Query {
    orders: [Order!]!
    order(id: Int!): Order
    expeditor: Expeditor!
  }
`;

const Mutation = `
  type Mutation {
    createOrder(
      name: String!,
      temp: String!,
      shelfLife: Int!,
      decayRate: Float!
    ): Order!
  }
`;

const Subscription = `
  type Subscription {
    orderCreated: Order
    expeditorExpedited: Expeditor
  }
`;

const typeDefs = gql`
  ${Driver}
  ${Order}
  ${Shelf}
  ${ExpeditorShelves}
  ${Expeditor}
  ${Query}
  ${Mutation}
  ${Subscription}
`;

module.exports = typeDefs;
