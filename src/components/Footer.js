import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import FilterLink from '../containers/FilterLink';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

// Router will be in control for any state that is in the url

// We will use an null string to signify the default path
const Footer = () => (
  // <p>
  //   Show:
  //   {' '}
  //   <FilterLink filter="all"> {/* Changed the filter naming pattern from constants to the url params we use*/}
  //     All
  //   </FilterLink>
  //   {', '}
  //   <FilterLink filter="active">
  //     Active
  //   </FilterLink>
  //   {', '}
  //   <FilterLink filter="completed">
  //     Completed
  //   </FilterLink>
  // </p>
  <div>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography type="title" color="inherit">
          Show:&nbsp;
          </Typography>
        {/* <Button raised color="accent">Login</Button>&nbsp; */}
        {/* <Button raised color="accent" component={Link} to="/active"> active </Button> */}
        <FilterLink filter="all" /> {/* Changed the filter naming pattern from constants to the url params we use*/}
        <FilterLink filter="active" />
        <FilterLink filter="completed" />


      </Toolbar>
    </AppBar>
  </div>

);

export default Footer;
