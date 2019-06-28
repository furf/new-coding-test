import { shallow } from 'enzyme';
import React from 'react';
import Order from './index';
import Race from '../Race';
import { now } from '../../../lib/time';

describe('<Order/>', () => {
  const createdAt = now();
  const driveTime = 7;
  const order = {
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
  };

  test('should render the order name', () => {
    const wrapper = shallow(<Order order={order} active />);
    expect(wrapper.find('.Order__name').text()).toBe(order.name);
  });

  test('should render the order health if active', () => {
    const wrapper = shallow(<Order order={order} active />);
    expect(wrapper.find('.Order__health').length).toBe(1);
  });

  test('should not render the order health if not active', () => {
    const wrapper = shallow(<Order order={order} />);
    expect(wrapper.find('.Order__health').length).toBe(0);
  });

  test('should render the order health as a % w/ precision of 2 decimals', () => {
    const wrapper = shallow(<Order order={order} active />);
    const health = `${(order.health * 100).toFixed(2)}%`;
    expect(wrapper.find('.Order__health').text()).toBe(health);
  });

  test('should render the race if active', () => {
    const wrapper = shallow(<Order order={order} active />);
    expect(wrapper.find(Race).length).toBe(1);
  });

  test('should not render the race if not active', () => {
    const wrapper = shallow(<Order order={order} />);
    expect(wrapper.find(Race).length).toBe(0);
  });
});
