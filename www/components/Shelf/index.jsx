import React from 'react';
import PropTypes from 'prop-types';
import ShelfHeader from '../ShelfHeader';
import OrderList from '../OrderList';
import './Shelf.less';

export default function Shelf({ name, shelf, active }) {
  const { orders } = shelf;
  const capacity = shelf.capacity ? `/${shelf.capacity}` : '';
  return (
    <div className="Shelf">
      <ShelfHeader>
        {name}{' '}
        <small>
          {orders.length}
          {capacity} orders
        </small>
      </ShelfHeader>
      <OrderList orders={orders} active={active} />
    </div>
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

Shelf.propTypes = {
  name: PropTypes.string.isRequired,
  shelf: PropTypes.shape({
    capacity: PropTypes.number,
    orders: PropTypes.arrayOf(orderShape).isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
};
