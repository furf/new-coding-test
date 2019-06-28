import React from 'react';
import PropTypes from 'prop-types';
import './ShelfHeader.less';

export default function ShelfHeader({ children }) {
  return (
    <header className="ShelfHeader">
      <h2>{children}</h2>
    </header>
  );
}

ShelfHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
