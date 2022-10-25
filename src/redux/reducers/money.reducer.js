const moneyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONEY':
            return action.payload;
        default:
            return state;
    }
}

export default moneyReducer;