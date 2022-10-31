const moneyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONEY':
            console.log('in moneyReducer and action payload is:', action.payload)
            return [...state, action.payload];
        case 'UNSET_MONEY':
            return [];
        default:
            return state;
    }
}

export default moneyReducer;