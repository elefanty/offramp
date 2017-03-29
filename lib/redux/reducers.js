const initialState = {
  pathname: window.location.pathname
}

const router = (state = initialState, action) => {
  switch (action.type) {
    case 'PATHNAME_CHANGE':
      if(state.pathname === action.pathname) return state;
      return { pathname: action.pathname };
    default:
      return state;
  };
};

export default router;