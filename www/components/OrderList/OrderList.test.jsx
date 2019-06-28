import { shallow } from 'enzyme';
import React from 'react';
import OrderList, { byCreatedAt } from './index';
import Order from '../Order';
import { now } from '../../../lib/time';

function createOrder(id) {
  const createdAt = now();
  const driveTime = 7;
  const order = {
    id,
    name: "Lay's Potato Chip",
    temp: 'cold',
    shelfLife: 440,
    decayRate: 0.44,
    driver: {
      driveTime,
      dispatchedAt: createdAt,
      willArriveAt: createdAt + driveTime,
      timeToArrival: 4,
    },
    health: 0.990181818,
    createdAt,
  };
  return order;
}

describe('<OrderList/>', () => {
  test('sorts properly', () => {
    const orders = [
      { id: 1, createdAt: 1 },
      { id: 3, createdAt: 3 },
      { id: 2, createdAt: 2 },
    ].sort(byCreatedAt);

    expect(orders[0].id).toBe(3);
    expect(orders[1].id).toBe(2);
    expect(orders[2].id).toBe(1);
  });

  test('does not render if has no orders', () => {
    const orders = [];

    const wrapper = shallow(<OrderList orders={orders} active />);
    expect(wrapper.getElement()).toBeNull();
  });

  test('renders all orders if "active"', () => {
    const numOrders = 20;
    const orders = [];
    for (let i = 1; i <= numOrders; i += 1) {
      orders.push(createOrder(i));
    }

    const wrapper = shallow(<OrderList orders={orders} active />);
    expect(wrapper.find(Order).length).toBe(numOrders);
  });

  test('renders last 15 orders if inactive', () => {
    const numOrders = 20;
    const orders = [];
    for (let i = 1; i <= numOrders; i += 1) {
      orders.push(createOrder(i));
    }

    const wrapper = shallow(<OrderList orders={orders} />);
    expect(wrapper.find(Order).length).toBe(15);
  });
});
