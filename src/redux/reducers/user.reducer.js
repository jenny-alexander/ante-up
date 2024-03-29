const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'SET_NEW_USER':
      return {...state, 'new': true };
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export const getUserInfo = (state) => state.user;
export default userReducer;
