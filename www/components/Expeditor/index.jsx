import React from 'react';
import PropTypes from 'prop-types';
import Shelf from '../Shelf';
import './Expeditor.less';

export default function Expeditor({ expeditor }) {
  return (
    <div className="Expeditor">
      <div className="Expeditor__doing">
        <div className="Expeditor__hot">
          <Shelf name="Hot" shelf={expeditor.shelves.hot} active />
        </div>
        <div className="Expeditor__cold">
          <Shelf name="Cold" shelf={expeditor.shelves.cold} active />
        </div>
        <div className="Expeditor__frozen">
          <Shelf name="Frozen" shelf={expeditor.shelves.frozen} active />
        </div>
        <div className="Expeditor__overflow">
          <Shelf name="Overflow" shelf={expeditor.shelves.overflow} active />
        </div>
      </div>
      <div className="Expeditor__done">
        <div className="Expeditor__delivery">
          <Shelf
            name="Recent Deliveries"
            shelf={expeditor.shelves.delivery}
            active={false}
          />
        </div>
        <div className="Expeditor__waste">
          <Shelf
            name="Recent Waste"
            shelf={expeditor.shelves.waste}
            active={false}
          />
        </div>
      </div>
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

const shelfShape = PropTypes.shape({
  capacity: PropTypes.number,
  orders: PropTypes.arrayOf(orderShape).isRequired,
});

Expeditor.propTypes = {
  expeditor: PropTypes.shape({
    shelves: PropTypes.shape({
      hot: shelfShape.isRequired,
      cold: shelfShape.isRequired,
      frozen: shelfShape.isRequired,
      overflow: shelfShape.isRequired,
      delivery: shelfShape.isRequired,
      waste: shelfShape.isRequired,
    }).isRequired,
  }).isRequired,
};
