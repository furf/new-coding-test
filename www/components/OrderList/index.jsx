import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';
import './OrderList.less';

export function byCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) return 1;
  if (a.createdAt > b.createdAt) return -1;
  return 0;
}

export default function OrderList({ orders, active }) {
  if (orders.length < 1) return null;
  const slice = active ? 0 : -15;
  return (
    <ul className="OrderList">
      {orders
        .slice(slice)
        .sort(byCreatedAt)
        .map(order => (
          <li key={order.id}>
            <Order order={order} active={active} />
          </li>
        ))}
    </ul>
  );
}

const driverShape = PropTypes.shape({
  driveTime: PropTypes.number.isRequired,
  dispatchedAt: PropTypes.number.isRequired,
  willArriveAt: PropTypes.number.isRequired,
  timeToArrival: PropTypes.number.isRequired,
});

const orderShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  shelfLife: PropTypes.number.isRequired,
  decayRate: PropTypes.number.isRequired,
  driver: driverShape.isRequired,
  health: PropTypes.number.isRequired,
  createdAt: PropTypes.number.isRequired,
});

OrderList.propTypes = {
  orders: PropTypes.arrayOf(orderShape),
  active: PropTypes.bool,
};

OrderList.defaultProps = {
  orders: [],
  active: false,
};
