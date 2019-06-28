import { shallow, mount } from 'enzyme';
import React from 'react';
import Shelf from './index';
import ShelfHeader from '../ShelfHeader';
import OrderList from '../OrderList';
import { now } from '../../../lib/time';

describe('<Shelf/>', () => {
  test('renders a ShelfHeader component', () => {
    const name = 'Hot';
    const createdAt = now();
    const driveTime = 7;
    const shelf = {
      capacity: 15,
      orders: [
        {
          id: 1,
          name: 'Lasagne',
          temp: 'hot',
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
        },
      ],
    };

    const wrapper = shallow(<Shelf name={name} shelf={shelf} active />);
    expect(wrapper.find(ShelfHeader).length).toBe(1);
  });

  test('renders the correct title, with capacity', () => {
    const name = 'Hot';
    const createdAt = now();
    const driveTime = 7;
    const shelf = {
      capacity: 15,
      orders: [
        {
          id: 1,
          name: 'Lasagne',
          temp: 'hot',
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
        },
      ],
    };

    const wrapper = mount(<Shelf name={name} shelf={shelf} active />);
    expect(wrapper.find(ShelfHeader).text()).toBe(
      `${name} ${shelf.orders.length}/${shelf.capacity} orders`,
    );
  });

  test('renders the correct title, without capacity', () => {
    const name = 'Recent Deliveries';
    const createdAt = now();
    const driveTime = 7;
    const shelf = {
      orders: [
        {
          id: 1,
          name: 'Lasagne',
          temp: 'hot',
          shelfLife: 440,
          decayRate: 0.44,
          driver: {
            driveTime,
            dispatchedAt: createdAt,
            willArriveAt: createdAt + driveTime,
            timeToArrival: 0,
          },
          health: 0.990181818,
          createdAt,
        },
      ],
    };

    const wrapper = mount(<Shelf name={name} shelf={shelf} active />);
    expect(wrapper.find(ShelfHeader).text()).toBe(
      `${name} ${shelf.orders.length} orders`,
    );
  });

  test('renders an OrderList component', () => {
    const name = 'Hot';
    const createdAt = now();
    const driveTime = 7;
    const shelf = {
      capacity: 15,
      orders: [
        {
          id: 1,
          name: 'Lasagne',
          temp: 'hot',
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
        },
      ],
    };

    const wrapper = shallow(<Shelf name={name} shelf={shelf} active />);
    expect(wrapper.find(OrderList).length).toBe(1);
  });
});
