import React from 'react';
import PropTypes from 'prop-types';
import { clamp } from '../../../lib/math';
import './Race.less';

export function getTranslateX(value) {
  const x = clamp(value, 0, 1) * 100;
  return `translateX(${x}%)`;
}

export default function Race({ driver, death }) {
  const driverStyle = { transform: getTranslateX(driver) };
  const deathStyle = { transform: getTranslateX(death) };
  return (
    <div className="Race">
      <div className="Race__stripes" />
      <div className="Race__track">
        <div className="Race__flag">
          <span role="img" aria-label="Checkered flag">
            🏁
          </span>
        </div>
        <div className="Race__racer Race__driver" style={driverStyle}>
          <span role="img" aria-label="Delivery truck">
            🚚
          </span>
        </div>
        <div className="Race__racer Race__death" style={deathStyle}>
          <span role="img" aria-label="Skull">
            💀
          </span>
        </div>
      </div>
    </div>
  );
}

Race.propTypes = {
  driver: PropTypes.number.isRequired,
  death: PropTypes.number.isRequired,
};
