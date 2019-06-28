import React from 'react';
import PropTypes from 'prop-types';
import './Layout.less';

function Layout({ children }) {
  return <main>{children}</main>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
