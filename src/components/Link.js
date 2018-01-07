import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  console.log('These are the fucking children: ', children);

  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={(e) => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
