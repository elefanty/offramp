const pathname = window.location.pathname;
const router = (state = { pathname }, action) => {
  switch (action.type) {
    case 'PATHNAME_CHANGE':
      return { pathname: action.pathname };
    default:
      return state;
  };
};

module.exports = { router };