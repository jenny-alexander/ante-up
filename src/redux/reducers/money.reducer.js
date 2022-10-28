const moneyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MONEY':
            console.log('in moneyReducer and action payload is:', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default moneyReducer;