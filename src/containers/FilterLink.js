import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
    // <NavLink
    //     to={filter === 'all' ? '' : filter}
    //     // Not working: Renders the first component the first time, and never applies the style again
    //     // activeStyle={{
    //     //     textDecoration: 'none',
    //     //     color: 'black',
    //     // }}
    // >
    //     {children}
    // </NavLink>
    <div>
        <Button
            raised
            color="accent"
            component={Link} to={filter === 'all' ? '' : filter}
        >
            {filter}
        </Button>
        &nbsp;
    </div>
);

FilterLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    filter: PropTypes.string,
};

export default FilterLink;
