import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import changePathname from './actions';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const Link = ({ dispatch, to, tag, className }) => {
  return (
    <a href={to}
       onClick={e => {
         e.preventDefault();
         dispatch(changePathname(to));
         history.push(to);
       }}
    >
      {tag}
    </a>
  )
}

Link.propTypes = {
  children: React.PropTypes.string
};

export default connect()(Link)
