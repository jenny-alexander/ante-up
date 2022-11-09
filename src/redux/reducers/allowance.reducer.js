const allowanceReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALLOWANCE':
            console.log('in allowanceReducer and action payload is:', action.payload)
            return [...state, action.payload];
        case 'UNSET_ALLOWANCE':
            return [];
        default:
            return state;
    }
}

export default allowanceReducer;