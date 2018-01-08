import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
    <NavLink
        to={filter === 'all' ? '' : filter}
        // Not working: Renders the first component the first time, and never applies the style again
        // activeStyle={{
        //     textDecoration: 'none',
        //     color: 'black',
        // }}
    >
        {children}
    </NavLink>
);

FilterLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    filter: PropTypes.string,
};

export default FilterLink;
