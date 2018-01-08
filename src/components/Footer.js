import React from 'react';
import FilterLink from '../containers/FilterLink';
// Router will be in control for any state that is in the url

// We will use an null string to signify the default path
const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter="all"> {/* Changed the filter naming pattern from constants to the url params we use*/}
      All
    </FilterLink>
    {', '}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
