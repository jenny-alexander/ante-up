const weekReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEEK':
      return action.payload;
    case 'UNSET_WEEK':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default weekReducer;
