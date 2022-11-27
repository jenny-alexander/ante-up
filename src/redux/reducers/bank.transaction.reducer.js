const bankTransactionReducer = (state = {}, action) => {
    console.log('in bankTransactionReducer and action is:', action);
    switch (action.type) {
        case 'GET_BANK_TRANSACTION_SUCCESS':
            console.log('OINK and payload is:', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default bankTransactionReducer;