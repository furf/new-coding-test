import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Race from '../Race';
import './Order.less';

export default function Order({ order, active }) {
  const className = classnames('Order', { 'Order--active': active });
  return (
    <div className={className}>
      <div className="Order__meta">
        <span className="Order__name">{order.name}</span>
        {active && (
          <small className="Order__health">
            {(order.health * 100).toFixed(2)}%
          </small>
        )}
      </div>
      {active && (
        <div className="Order__race">
          <Race
            driver={order.driver.timeToArrival / order.driver.driveTime}
            death={order.health}
          />
        </div>
      )}
    </div>
  );
}

const driverShape = PropTypes.shape({
  driveTime: PropTypes.number.isRequired,
  dispatchedAt: PropTypes.number.isRequired,
  willArriveAt: PropTypes.number.isRequired,
  timeToArrival: PropTypes.number.isRequired,
});

Order.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    temp: PropTypes.string.isRequired,
    shelfLife: PropTypes.number.isRequired,
    decayRate: PropTypes.number.isRequired,
    driver: driverShape.isRequired,
    health: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
  }).isRequired,
  active: PropTypes.bool,
};

Order.defaultProps = {
  active: false,
};
