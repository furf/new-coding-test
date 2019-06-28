const { PubSub } = require('apollo-server');
const Expeditor = require('../models/Expeditor');
const Order = require('../models/Order');

// Use pub-sub for real-time client subscriptions to expeditor updates.
const pubSub = new PubSub();
const expeditor = new Expeditor();

// Update the expeditor.
const EXPEDITOR_INTERVAL = 250;
setInterval(() => {
  expeditor.expedite();
  pubSub.publish('expeditorExpedited', { expeditorExpedited: expeditor });
}, EXPEDITOR_INTERVAL);

module.exports = {
  Query: {
    expeditor: async () => expeditor,
    // The following GraphQL queries are not included in the demo, but can be
    // previewed by visiting the GraphQL playground at http://localhost:4000.
    orders: async () => expeditor.orders,
    order: async (_, { id }) =>
      expeditor.orders.filter(order => order.id === id)[0] || null,
  },

  Mutation: {
    createOrder: async (_, { name, temp, shelfLife, decayRate }) => {
      const orderCreated = new Order({
        name,
        temp,
        shelfLife,
        decayRate,
      });
      expeditor.addOrder(orderCreated);
      pubSub.publish('orderCreated', { orderCreated });
      return orderCreated;
    },
  },

  Subscription: {
    expeditorExpedited: {
      subscribe: () => pubSub.asyncIterator('expeditorExpedited'),
    },
    // The following GraphQL subscription is not included in the demo, but can
    // be previewed by visiting the GraphQL playground at http://localhost:4000.
    orderCreated: {
      subscribe: () => pubSub.asyncIterator('orderCreated'),
    },
  },
};
