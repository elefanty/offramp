import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { changePathname } from './actions';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const Link = ({ dispatch, to, children, className }) => {
  return (
    <a href={to}
       onClick={e => {
         e.preventDefault();
         dispatch(changePathname(to));
         history.push(to);
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired
};

export default connect()(Link)
